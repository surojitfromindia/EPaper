import { Transaction } from "@sequelize/core";
import { InvoiceLineItem } from "../../Models";
import {
  InvoiceLineItemCreatable,
  InvoiceLineItemIdType,
} from "../../Models/Invoice/InvoiceLineItems.model";
import { InvoiceIdType } from "../../Models/Invoice/Invoices.model";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";

type InvoiceLineItemBulkCreateProps = {
  invoice_line_items: InvoiceLineItemCreatable[];
};
type InvoiceLineItemBulkCreatePropsOptions = {
  transaction: Transaction;
};

type InvoiceLineItemGetProps = {
  invoice_id: InvoiceIdType;
  organization_id: OrganizationBasicIdType;
};
type InvoiceLineItemBulkDeleteProps = {
  invoice_id: InvoiceIdType;
  organization_id: OrganizationBasicIdType;
  line_item_ids: InvoiceLineItemIdType[];
};

type InvoiceLineItemBulkUpdateProps = {
  invoice_line_items: InvoiceLineItemCreatable[];
};

type BulkUpdateAllowedFields = Omit<
  InvoiceLineItemCreatable,
  "invoiceId" | "organizationId" | "id"
>;
const bulkUpdateAllowedFields: Required<keyof BulkUpdateAllowedFields>[] = [
  "name",
  "description",
  "quantity",
  "rate",
  "unitId",
  "taxId",
  "discountPercentage",
  "discountAmount",
  "taxPercentage",
  "taxAmount",
  "itemTotal",
  "itemTotalTaxIncluded",
];

class InvoiceLineItemDao {
  async bulkCreate(
    { invoice_line_items }: InvoiceLineItemBulkCreateProps,
    { transaction }: InvoiceLineItemBulkCreatePropsOptions,
  ) {
    return await InvoiceLineItem.bulkCreate(invoice_line_items, {
      transaction,
    });
  }

  async getByInvoiceId({
    invoice_id,
    organization_id,
  }: InvoiceLineItemGetProps) {
    return await InvoiceLineItem.findAll({
      where: {
        invoiceId: invoice_id,
        organizationId: organization_id,
      },
    });
  }

  async bulkDeleteByInvoiceId(
    {
      invoice_id,
      organization_id,
      line_item_ids,
    }: InvoiceLineItemBulkDeleteProps,
    { transaction }: InvoiceLineItemBulkCreatePropsOptions,
  ) {
    return await InvoiceLineItem.destroy({
      where: {
        invoiceId: invoice_id,
        organizationId: organization_id,
        id: line_item_ids,
      },
      transaction,
    });
  }

  async bulkUpdateByInvoiceId(
    { invoice_line_items }: InvoiceLineItemBulkUpdateProps,
    { transaction }: InvoiceLineItemBulkCreatePropsOptions,
  ) {
    return await InvoiceLineItem.bulkCreate(invoice_line_items, {
      updateOnDuplicate: bulkUpdateAllowedFields,
      transaction,
    });
  }
}

export default Object.freeze(new InvoiceLineItemDao());
