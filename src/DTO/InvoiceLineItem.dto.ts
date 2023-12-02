import {
  InvoiceLineItemCreatableBasic,
  InvoiceLineItemType,
} from "../Models/Invoice/InvoiceLineItems.model";

class InvoiceLineItemDTO {
  static toInvoiceLineItem(line_item: InvoiceLineItemType) {
    const return_data = {};
    Object.assign(return_data, {
      line_item_id: line_item.id,
      item_id: line_item.itemId,
      name: line_item.name,
      description: line_item.description,
      unit: line_item.unit,
      unit_id: line_item.unitId,
      account_id: line_item.accountId,
      tax_id: line_item.taxId,
      rate: line_item.rate,
      quantity: line_item.quantity,
      discount_percentage: line_item.discountPercentage,
      discount_amount: line_item.discountAmount,
      tax_percentage: line_item.taxPercentage,
      tax_amount: line_item.taxAmount,
      item_total: line_item.itemTotal,
      item_total_tax_included: line_item.itemTotalTaxIncluded,
    });
    if ("Account" in line_item) {
      Object.assign(return_data, {
        account_name: line_item.Account.name,
      });
    }
    if ("Tax" in line_item) {
      Object.assign(return_data, {
        tax_name: line_item.Tax.name,
      });
    }
    return return_data;
  }

  static toInvoiceLineItemCreate(
    line_item: any,
  ): InvoiceLineItemCreatableBasic {
    return {
      name: line_item.name,
      itemId: line_item.item_id,
      description: line_item.description,
      unit: line_item.unit,
      unitId: line_item.unit_id,
      accountId: line_item.account_id,
      quantity: line_item.quantity,
      taxId: line_item.tax_id,
      rate: line_item.rate,
      discountPercentage: line_item.discount_percentage,
      taxPercentage: line_item.tax_percentage,
    };
  }

  static toInvoiceLineItemUpdate(
    line_item: any,
  ): InvoiceLineItemCreatableBasic {
    return {
      id: line_item.line_item_id,
      name: line_item.name,
      itemId: line_item.item_id,
      description: line_item.description,
      unit: line_item.unit,
      unitId: line_item.unit_id,
      accountId: line_item.account_id,
      quantity: line_item.quantity,
      taxId: line_item.tax_id,
      rate: line_item.rate,
      discountPercentage: line_item.discount_percentage,
      taxPercentage: line_item.tax_percentage,
    };
  }
}

type ToInvoiceLineItemDTOType = ReturnType<
  typeof InvoiceLineItemDTO.toInvoiceLineItem
>;
type ToInvoiceLineItemCreateType = ReturnType<
  typeof InvoiceLineItemDTO.toInvoiceLineItemCreate
>;
export { InvoiceLineItemDTO };
export type { ToInvoiceLineItemDTOType, ToInvoiceLineItemCreateType };
