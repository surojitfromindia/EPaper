import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import {
  InvoiceCreatable,
  InvoiceIdType,
} from "../../Models/Invoice/Invoices.model";
import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import sequelize from "../../Config/DataBase.Config";
import { InvoiceDao, InvoiceLineItemDao } from "../../DAO";
import { DataNotFoundError } from "../../Errors/APIErrors";
import { InvoiceCalculation } from "./InvoiceCalculation";

type InvoiceCreateProps = {
  invoice_details: any;
  client_info: ClientInfo;
};

type InvoiceGetProps = {
  invoice_id: InvoiceIdType;
  client_info: ClientInfo;
};

class InvoiceService {
  async create({ client_info, invoice_details }: InvoiceCreateProps) {
    const invoiceBody: InvoiceCreatable = {
      organizationId: client_info.organizationId,
      createdBy: client_info.userId,
      invoiceNumber: invoice_details.invoice_number,
      contactId: invoice_details.contact_id,
      referenceNumber: invoice_details.reference_number,
      orderNumber: invoice_details.order_number,
      notes: invoice_details.notes ?? "",
      terms: invoice_details.terms ?? "",
      isInclusiveTax: invoice_details.is_inclusive_tax,
      status: "active",
    };
    const lineItems = invoice_details.line_items;
    const lineItemsBody: InvoiceLineItemCreatable[] = lineItems.map(
      (lineItem: any): InvoiceLineItemCreatable => ({
        organizationId: client_info.organizationId,
        itemId: lineItem.item_id,
        name: lineItem.name,
        unit: lineItem.unit,
        unitId: lineItem.unit_id,
        taxId: lineItem.tax_id,
        accountId: lineItem.account_id,
        rate: lineItem.rate,
        quantity: lineItem.quantity,
        discountPercentage: lineItem.discount_percentage,
        taxPercentage: lineItem.tax_percentage,
      }),
    );
    return await sequelize.transaction(async (t1) => {
      const invoiceCalculation = await InvoiceCalculation.init({
        invoice: invoiceBody,
        client_info,
        line_items: lineItemsBody,
      });
      let { invoice: newInvoice, line_items: newLineItems } =
        invoiceCalculation.calculate();

      const createdInvoice = await InvoiceDao.create(
        {
          invoice_details: newInvoice,
        },
        {
          transaction: t1,
        },
      );
      const invoiceId = createdInvoice.id;
      newLineItems = newLineItems.map((lineItem) =>
        Object.assign(lineItem, { invoiceId }),
      );
      await InvoiceLineItemDao.bulkCreate(
        {
          invoice_line_items: newLineItems,
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
}

export default Object.freeze(new InvoiceService());
