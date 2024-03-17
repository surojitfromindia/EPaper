import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { InvoiceIdType } from "../../Models/Invoice/Invoices.model";
import sequelize from "../../Config/DataBase.Config";
import { InvoiceDao, InvoiceLineItemDao } from "../../DAO";
import { DataNotFoundError } from "../../Errors/APIErrors";
import { InvoiceLineCalculation } from "./InvoiceLineCalculation";
import { ToInvoiceCreateType } from "../../DTO/Invoice.DTO";
import { InvoiceUtil } from "./InvoiceUtil";
import { ValidityUtil } from "../../Utils/ValidityUtil";
import { ContactService } from "../Contact/Contact.service";
import { AutoNumberGenerationService } from "../SettingServices/AutoNumberSeries.service";
import CodedError from "../../Errors/APIErrors/CodedError";
import { InvoiceServiceErrorMessages } from "../../Errors/APIErrors/ErrorMessages";
import { Transaction } from "@sequelize/core";
import { InvoiceJournalService } from "./InvoiceJournal.service";
import { InvoiceGetAllQueryParsedFields } from "../FilterAndPaginationServices/InvoiceFilter.service";
import { PageContextService } from "../FilterAndPaginationServices/PageContext.service";

type InvoiceCreateProps = {
  invoice_details: ToInvoiceCreateType;
};
type InvoiceGetProps = {
  invoice_id: InvoiceIdType;
};

interface InvoiceGetAllProps extends InvoiceGetAllQueryParsedFields {}

class InvoiceService {
  private readonly _clientInfo: ClientInfo;
  private readonly _organizationId: number;
  private readonly _userId: number;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._clientInfo = client_info;
    this._organizationId = client_info.organizationId;
    this._userId = client_info.userId;
  }

  async create({ invoice_details }: InvoiceCreateProps) {
    const organizationId = this._organizationId;
    const userId = this._userId;
    const contactId = invoice_details.contactId;
    const issueDate = invoice_details.issueDate;
    const transactionStatus = invoice_details.transactionStatus;

    // these values are replaceable
    let dueDate = invoice_details.dueDate;
    let paymentTermId = invoice_details.paymentTermId;
    let currencyId = invoice_details.currencyId;
    let invoicePaymentTermId: number | null = null;
    let invoiceNumber = invoice_details.invoiceNumber;

    const invoiceBody = {
      ...invoice_details,
      organizationId,
      createdBy: userId,
    };

    return await sequelize.transaction(async (t1) => {
      // generate invoice number
      invoiceNumber = await this.#invoiceNumberValidityAndGeneration(
        invoiceNumber,
        invoice_details.autoNumberGroupId,
        t1,
      );

      // calculate due date
      if (ValidityUtil.isNotEmpty(paymentTermId)) {
        const { due_date, invoice_payment_term_id } =
          await InvoiceUtil.generateInvoicePaymentTermId(
            {
              payment_term_id: paymentTermId,
              issue_date: issueDate,
              custom_due_date: dueDate,
              organization_id: organizationId,
            },
            {
              transaction: t1,
            },
          );

        // update the due date and create a new invoicePaymentTerm
        dueDate = due_date;
        invoicePaymentTermId = invoice_payment_term_id;
      }

      // if currencyId is not present, get the currencyId from contact
      if (ValidityUtil.isEmpty(currencyId)) {
        const contactService = new ContactService({
          client_info: this._clientInfo,
        });
        const contact = await contactService.getContactByIdRaw({
          contact_id: contactId,
        });
        currencyId = contact.currencyId;
      }

      // line item and gross data calculation
      const invoiceCalculation = await InvoiceLineCalculation.init({
        client_info: this._clientInfo,
        is_inclusive_tax: invoiceBody.isInclusiveTax,
        exchange_rate: invoiceBody.exchangeRate,
        line_items: invoiceBody.lineItems,
      });
      const invoiceCalculateReturn = invoiceCalculation.calculate();
      const newLineItems = invoiceCalculateReturn.line_items;

      Object.assign(invoiceBody, {
        invoiceNumber,
        dueDate,
        invoicePaymentTermId,
        currencyId,
        discountTotal: invoiceCalculateReturn.discountTotal,
        subTotal: invoiceCalculateReturn.subTotal,
        taxTotal: invoiceCalculateReturn.taxTotal,
        total: invoiceCalculateReturn.total,
        bcyDiscountTotal: invoiceCalculateReturn.bcyDiscountTotal,
        bcySubTotal: invoiceCalculateReturn.bcySubTotal,
        bcyTaxTotal: invoiceCalculateReturn.bcyTaxTotal,
        bcyTotal: invoiceCalculateReturn.bcyTotal,
      });

      // create the invoice
      const createdInvoice = await InvoiceDao.create(
        {
          invoice_details: invoiceBody,
        },
        {
          transaction: t1,
        },
      );
      const invoiceId = createdInvoice.id;

      // create the line items with invoice id
      const newLineItemsWithInvoiceId = newLineItems.map((lineItem) =>
        Object.assign(lineItem, {
          invoiceId,
          organizationId,
        }),
      );

      const created_line_items = await InvoiceLineItemDao.bulkCreate(
        {
          invoice_line_items: newLineItemsWithInvoiceId,
        },
        {
          transaction: t1,
        },
      );

      // update the contact balance
      //  if the mark as sent is true, update the contact balance
      if (transactionStatus === "sent") {
        const contactService = new ContactService({
          client_info: this._clientInfo,
        });
        await contactService.updateBalanceOnInvoiceNotPaid(
          {
            contact_id: contactId,
            currency_id: currencyId,
            new_invoice_amount: createdInvoice.total,
            old_invoice_amount: 0,
            new_invoice_amount_bcy: createdInvoice.bcyTotal,
            old_invoice_amount_bcy: 0,
          },
          {
            transaction: t1,
          },
        );

        // create journal entries
        const invoiceJournalService = new InvoiceJournalService({
          organization_id: organizationId,
        });
        const journalFactory =
          await invoiceJournalService.getCreatableCalculation({
            invoice_id: invoiceId,
            contact_id: contactId,
          });
        await journalFactory.create(
          {
            line_items: created_line_items,
          },
          {
            transaction: t1,
          },
        );
      }

      return await this.getAnInvoice({
        invoice_id: invoiceId,
      });
    });
  }

  async getAnInvoice({ invoice_id }: InvoiceGetProps) {
    const organizationId = this._organizationId;
    const invoice = await InvoiceDao.getByIdWithLineItems({
      invoice_id,
      organization_id: organizationId,
    });
    if (invoice) {
      return invoice;
    }
    throw new DataNotFoundError();
  }

  async getAllInvoice({
    filter_by,
    skip,
    limit,
    sort_column,
    sort_order,
  }: InvoiceGetAllProps) {
    const organizationId = this._organizationId;
    const getAllDAO = await InvoiceDao.getAllDAO({
      organization_id: organizationId,
    });
    const invoices = await getAllDAO
      .applyFilterBy(filter_by)
      .applySortBy(sort_column, sort_order === "D" ? "DESC" : "ASC")
      .getAll(skip, limit);

    const pageContextService = new PageContextService({
      limit: limit,
      skip: skip,
      current_count: invoices.length,
    });
    const pageContext = pageContextService.get("invoice")({
      sort_column,
      sort_order,
      filter_by,
    });

    return {
      invoices,
      page_context: pageContext,
    };
  }

  async #invoiceNumberValidityAndGeneration(
    given_number: string | null,
    auto_number_group_id: number,
    transaction: Transaction,
  ): Promise<string | never> {
    if (ValidityUtil.isEmpty(given_number)) {
      const autoNumberGenerationService = new AutoNumberGenerationService({
        client_info: this._clientInfo,
      });
      return await autoNumberGenerationService.generateNextNumber(
        {
          auto_number_group_id: auto_number_group_id,
          entity_type: "invoice",
        },
        {
          transaction,
        },
      );
    } else {
      // check if invoice number is already present
      const result = await InvoiceDao.isInvoiceNumberExists({
        invoice_number: given_number,
        organization_id: this._organizationId,
      });
      if (result) {
        throw new CodedError(
          InvoiceServiceErrorMessages.INVOICE_NUMBER_ALREADY_EXISTS,
        );
      }
      return given_number;
    }
  }
}

export default InvoiceService;
