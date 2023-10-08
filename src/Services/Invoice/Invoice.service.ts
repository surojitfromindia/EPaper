import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { InvoiceCreatable } from "../../Models/Invoice/Invoices.model";
import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import sequelize from "../../Config/DataBase.Config";
import { InvoiceDao, InvoiceLineItemDao } from "../../DAO";
import { DataNotFoundError } from "../../Errors/APIErrors";

class InvoiceService {
  async create({
    client_info,
    invoice_details,
  }: {
    invoice_details: any;
    client_info: ClientInfo;
  }) {
    const newInvoice: InvoiceCreatable = {
      organizationId: client_info.organizationId,
      createdBy: client_info.userId,
      invoiceNumber: invoice_details.invoice_number,
      contactId: invoice_details.contact_id,
      referenceNumber: invoice_details.reference_number,
      orderNumber: invoice_details.order_number,
      notes: invoice_details.notes,
      terms: invoice_details.terms,
      isInclusiveTax: invoice_details.is_inclusive_tax,
      taxTotal: invoice_details.tax_total,
      discountTotal: invoice_details.discount_total,
      subTotal: invoice_details.sub_total,
      total: invoice_details.total,
      status: "active",
    };
    return await sequelize.transaction(async (t1) => {
      const createdInvoice = await InvoiceDao.create(
        {
          invoice_details: newInvoice,
        },
        {
          transaction: t1,
        },
      );
      const invoiceId = createdInvoice.id;

      const lineItems = invoice_details.line_items;
      const newLineItems: InvoiceLineItemCreatable[] = lineItems.map(
        (lineItem: any): InvoiceLineItemCreatable => ({
          organizationId: client_info.organizationId,

          invoiceId,
          itemId: lineItem.item_id,
          name: lineItem.name,
          unit: lineItem.unit,
          unitId: lineItem.unit_id,
          taxId: lineItem.tax_id,
          accountId: lineItem.account_id,
          rate: lineItem.rate,
          quantity: lineItem.quantity,
          discountPercentage: lineItem.discount_percentage,
          discountAmount: lineItem.discount_amount,
          taxAmount: lineItem.tax_amount,
          taxPercentage: lineItem.tax_percentage,
          itemTotal: lineItem.item_total,
          itemTotalTaxIncluded: lineItem.item_total_tax_included,
        }),
      );
      const createdInvoiceLineItems = await InvoiceLineItemDao.bulkCreate(
        {
          invoice_line_items: newLineItems,
        },
        {
          transaction: t1,
        },
      );
      return createdInvoice;
    });
  }

  async getAnInvoice({ invoice_id, client_info }) {
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
}

export default Object.freeze(new InvoiceService());
