import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { InvoiceIdType } from "../../Models/Invoice/Invoices.model";
import sequelize from "../../Config/DataBase.Config";
import { InvoiceDao, InvoiceLineItemDao } from "../../DAO";
import { DataNotFoundError } from "../../Errors/APIErrors";
import { InvoiceCalculation } from "./InvoiceCalculation";
import { ToInvoiceCreateType } from "../../DTO/Invoice.DTO";
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
        is_inclusive_tax: invoiceBody.isInclusiveTax,
        exchange_rate: invoiceBody.exchangeRate,
        line_items: invoiceBody.lineItems,
      });
      const invoiceCalculateReturn = invoiceCalculation.calculate();
      const newLineItems = invoiceCalculateReturn.line_items;

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
