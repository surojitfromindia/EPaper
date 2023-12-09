import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { InvoiceIdType } from "../../Models/Invoice/Invoices.model";
import sequelize from "../../Config/DataBase.Config";
import { InvoiceDao, InvoiceLineItemDao } from "../../DAO";
import { DataNotFoundError } from "../../Errors/APIErrors";
import { InvoiceCalculation } from "./InvoiceCalculation";
import { ToInvoiceCreateType } from "../../DTO/Invoice.dto";
import { DateUtil } from "../../Utils/DateUtil";
import { DATE_FORMAT_DB } from "../../Constants/DateFormat.Constant";
import { InvoiceUtil } from "./InvoiceUtil";
import { ValidityUtil } from "../../Utils/ValidityUtil";
import { ContactService } from "../Contact/Contact.service";

type InvoiceCreateProps = {
  invoice_details: ToInvoiceCreateType;
  client_info: ClientInfo;
};
type InvoiceGetProps = {
  invoice_id: InvoiceIdType;
  client_info: ClientInfo;
};
class InvoiceService {
  async create({ client_info, invoice_details }: InvoiceCreateProps) {
    const organizationId = client_info.organizationId;
    const userId = client_info.userId;
    const contactId = invoice_details.contactId;
    const issueDate = invoice_details.issueDate;

    // these values are replaceable
    let dueDate = invoice_details.dueDate;
    let paymentTermId = invoice_details.paymentTermId;
    let currencyId = invoice_details.currencyId;
    let invoicePaymentTermId: number | null = null;

    const invoiceBody = {
      ...invoice_details,
      organizationId,
      createdBy: userId,
    };

    return await sequelize.transaction(async (t1) => {
      // line item and gross data calculation
      const invoiceCalculation = await InvoiceCalculation.init({
        client_info,
        invoice: invoiceBody,
        line_items: invoiceBody.lineItems,
      });
      const invoiceCalculateReturn = invoiceCalculation.calculate();
      const newLineItems = invoiceCalculateReturn.line_items;

      // calculate due date
      if (paymentTermId) {
        const { due_date, payment_term_details: paymentTermDetails } =
          await InvoiceUtil.calculateDueDate({
            issue_date: DateUtil.parseFromStr(issueDate),
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
        dueDate = DateUtil.Formatter(due_date).format(DATE_FORMAT_DB);
        invoicePaymentTermId = createdInvoicePaymentTerm.id;
      }

      // if currencyId is not present, get the currencyId from contact
      if (ValidityUtil.isEmpty(currencyId)) {
        const contactService = new ContactService({
          client_info,
        });
        const contact = await contactService.getContactByIdRaw({
          contact_id: contactId,
        });
        currencyId = contact.currencyId;
      }

      Object.assign(invoiceBody, {
        dueDate,
        invoicePaymentTermId,
        currencyId,
        subTotal: invoiceCalculateReturn.subTotal,
        total: invoiceCalculateReturn.total,
        discountTotal: invoiceCalculateReturn.discountTotal,
        taxTotal: invoiceCalculateReturn.taxTotal,
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

  getAllInvoice({ client_info }: { client_info: ClientInfo }) {
    const organizationId = client_info.organizationId;
    return InvoiceDao.getAll({
      organization_id: organizationId,
    });
  }
}

export default Object.freeze(new InvoiceService());
