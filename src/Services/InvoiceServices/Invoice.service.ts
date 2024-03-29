import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { Invoice, InvoiceIdType } from "../../Models/Invoice/Invoices.model";
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
        // on create balances should be the same as total
        balance: invoiceCalculateReturn.total,
        bcyBalance: invoiceCalculateReturn.bcyTotal,
        paymentStatus: "not_paid",
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

      //  if the mark as sent is true
      if (transactionStatus === "sent") {
        // update the contact balance
        const contactService = new ContactService({
          client_info: this._clientInfo,
        });
        await contactService.updateBalanceOnInvoiceCreateAsSent(
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

        // update invoice balance balance
        await this.updateInvoiceBalance(
          {
            invoice_id: invoiceId,
            total: createdInvoice.total,
            new_balance: createdInvoice.total,
            new_balance_bcy: createdInvoice.bcyTotal,
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

      return await this.getAnInvoice(
        {
          invoice_id: invoiceId,
        },
        {
          include_line_items: true,
        },
      );
    });
  }

  async getAnInvoice(
    { invoice_id }: InvoiceGetProps,
    { include_line_items = true },
  ) {
    const organizationId = this._organizationId;
    let invoice: Invoice;
    if (include_line_items) {
      invoice = await InvoiceDao.getByIdWithLineItems({
        invoice_id,
        organization_id: organizationId,
      });
    } else {
      invoice = await InvoiceDao.getInvoiceByIdRaw({
        invoice_id,
        organization_id: organizationId,
        include_line_items: false,
      });
    }
    if (invoice) {
      return invoice;
    }
    throw new DataNotFoundError();
  }

  async getAllInvoice({
    filter_by,
    skip,
    limit,
    sort_columns,
    sort_orders,
  }: InvoiceGetAllProps) {
    const organizationId = this._organizationId;
    const getAllDAO = await InvoiceDao.getAllDAO({
      organization_id: organizationId,
      skip,
    });
    const dao = getAllDAO
      .applyLimit(limit)
      .applyFilterBy(filter_by)
      .applySortBy(sort_columns[0], sort_orders[0] === "D" ? "DESC" : "ASC");

    const invoices = await dao.getAll();
    const hasMorePage = await dao.hasMore();

    const pageContextService = new PageContextService({
      limit: limit,
      skip: skip,
      current_count: invoices.length,
    }).setHasMorePage(hasMorePage);
    const pageContext = pageContextService.get("invoice")({
      sort_column: sort_columns[0], // sort_columns[0] is the first column
      sort_order: sort_orders[0], // sort_orders[0] is the first order
      filter_by,
    });

    return {
      invoices,
      page_context: pageContext,
    };
  }

  async updateInvoiceBalance(
    { invoice_id, total, new_balance, new_balance_bcy },
    {
      transaction,
    }: {
      transaction: Transaction;
    },
  ) {
    // if balance is negative, then throw error
    if (new_balance < 0) {
      throw new CodedError(
        InvoiceServiceErrorMessages.INVOICE_APPLIED_AMOUNT_GREATER,
      );
    }

    return await InvoiceDao.updateBalance(
      {
        organization_id: this._organizationId,
        balance: new_balance,
        bcy_balance: new_balance_bcy,
        invoice_id,
        payment_status: this.#generatePaymentStatus({
          total,
          new_balance,
        }),
      },
      {
        transaction,
      },
    );
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

  #generatePaymentStatus = ({ total, new_balance }) => {
    if (new_balance === 0) {
      return "paid";
    }
    if (new_balance < total) {
      return "partial_paid";
    }
    return "not_paid";
  };
}

export default InvoiceService;
