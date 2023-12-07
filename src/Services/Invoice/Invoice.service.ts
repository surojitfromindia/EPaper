import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { InvoiceIdType } from "../../Models/Invoice/Invoices.model";
import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import sequelize from "../../Config/DataBase.Config";
import { InvoiceDao, InvoiceLineItemDao } from "../../DAO";
import { DataNotFoundError } from "../../Errors/APIErrors";
import { InvoiceCalculation } from "./InvoiceCalculation";
import {
  ItemUnitService,
  PaymentTermService,
  TaxRateService,
} from "../SettingServices/Setting.service";
import { AccountsOfOrganizationService } from "../index";
import { AccountsTree } from "../../Utils/AccoutsTree";
import { ToInvoiceCreateType } from "../../DTO/Invoice.dto";
import { DateUtil } from "../../Utils/DateUtil";
import { DATE_FORMAT_DB } from "../../Constants/DateFormat.Constant";
import { InvoiceUtil } from "./InvoiceUtil";

type InvoiceCreateProps = {
  invoice_details: ToInvoiceCreateType;
  client_info: ClientInfo;
};
type InvoiceUpdateProps = {
  invoice_details: ToInvoiceCreateType;
  client_info: ClientInfo;
  invoice_id: InvoiceIdType;
};

type InvoiceGetProps = {
  invoice_id: InvoiceIdType;
  client_info: ClientInfo;
};

type InvoiceGetEdiPageProps = {
  invoice_id: InvoiceIdType;
  client_info: ClientInfo;
};
class InvoiceService {
  async create({ client_info, invoice_details }: InvoiceCreateProps) {
    const organizationId = client_info.organizationId;
    const userId = client_info.userId;

    // invoice and line items
    const invoiceBody = {
      ...invoice_details,
      organizationId,
      createdBy: userId,
    };
    const paymentTermId = invoice_details.paymentTermId;

    // line items
    const lineItemsBody: InvoiceLineItemCreatable[] = invoice_details.lineItems;

    return await sequelize.transaction(async (t1) => {
      const invoiceCalculation = await InvoiceCalculation.init({
        client_info,
        invoice: invoiceBody,
        line_items: lineItemsBody,
      });
      const { invoice: newInvoice, line_items: newLineItems } =
        invoiceCalculation.calculate();

      // calculate due date
      if (paymentTermId) {
        const { due_date: dueDate, payment_term_details: paymentTermDetails } =
          await InvoiceUtil.calculateDueDate({
            issue_date: DateUtil.parseFromStr(newInvoice.issueDate),
            payment_term_id: paymentTermId,
            organization_id: organizationId,
          });

        // create the invoicePaymentTerm if paymentTermId is present
        const createdInvoicePaymentTerm =
          await InvoiceUtil.createInvoicePaymentTerm(
            {
              payment_term_details: paymentTermDetails,
            },
            {
              transaction: t1,
            },
          );

        // update the due date and create a new invoicePaymentTerm
        newInvoice.dueDate = DateUtil.Formatter(dueDate).format(DATE_FORMAT_DB);
        newInvoice.invoicePaymentTermId = createdInvoicePaymentTerm.id;
      }

      // create the invoice
      const createdInvoice = await InvoiceDao.create(
        {
          invoice_details: newInvoice,
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
      await InvoiceLineItemDao.bulkCreate(
        {
          invoice_line_items: newLineItemsWithInvoiceId,
        },
        {
          transaction: t1,
        },
      );
      return await this.getAnInvoice({ invoice_id: invoiceId, client_info });
    });
  }

  async getAnInvoice({ invoice_id, client_info }: InvoiceGetProps) {
    const organizationId = client_info.organizationId;
    const invoice = await InvoiceDao.getByIdWithLineItems({
      invoice_id,
      organization_id: organizationId,
    });
    if (invoice) {
      return invoice;
    }
    throw new DataNotFoundError();
  }

  async getEditPage({ client_info, invoice_id }: InvoiceGetEdiPageProps) {
    let invoiceDetails = null;
    const taxes = await TaxRateService.getAllTaxRates({ client_info });
    const itemUnits = await ItemUnitService.getAllItemUnits({ client_info });
    const paymentTerms = await PaymentTermService.getAllPaymentTerms({
      client_info,
    });
    const { line_item_accounts_list } =
      await AccountsOfOrganizationService.ofInvoiceLineItem({
        client_info,
      }).getAccountsForInvoiceLineItem();
    if (invoice_id) {
      invoiceDetails = await this.getAnInvoice({
        invoice_id,
        client_info,
      });
    }
    return {
      invoice_details: invoiceDetails,
      taxes,
      units: itemUnits,
      payment_terms: paymentTerms,
      line_item_accounts_list:
        AccountsTree.createTreeOfOrganizationAccountsAsDTO({
          accounts: line_item_accounts_list,
        }).flatArrayFromTreeAsDTO(),
    };
  }

  getAllInvoice({ client_info }: { client_info: ClientInfo }) {
    const organizationId = client_info.organizationId;
    return InvoiceDao.getAll({
      organization_id: organizationId,
    });
  }
}

export default Object.freeze(new InvoiceService());
