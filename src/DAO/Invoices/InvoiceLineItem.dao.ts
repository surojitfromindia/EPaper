import { Transaction } from "@sequelize/core";
import { InvoiceLineItem } from "../../Models";
import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";

class InvoiceLineItemDao {
  async bulkCreate(
    {
      invoice_line_items,
    }: {
      invoice_line_items: InvoiceLineItemCreatable[];
    },
    {
      transaction,
    }: {
      transaction: Transaction;
    },
  ) {
    return await InvoiceLineItem.bulkCreate(invoice_line_items, {
      transaction,
    });
  }
}

export default Object.freeze(new InvoiceLineItemDao());
