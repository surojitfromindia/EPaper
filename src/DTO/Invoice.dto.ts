import { InvoiceLineItemDTO, ItemUnitDTO, TaxRateDTO } from "./index";
import {
  InvoiceCreatableBasic,
  InvoiceType,
} from "../Models/Invoice/Invoices.model";
import { InvoiceLineItemCreatableBasic } from "../Models/Invoice/InvoiceLineItems.model";

class InvoiceDTO {
  static toInvoiceEditPage({ taxes, units, line_item_accounts_list }) {
    return {
      taxes: taxes.map(TaxRateDTO.toTaxRate),
      units: units.map(ItemUnitDTO.toItemUnit),
      line_item_accounts_list,
    };
  }

  static toInvoice(invoice: InvoiceType) {
    return {
      invoice_id: invoice.id,
      contact_id: invoice.contactId,
      invoice_number: invoice.invoiceNumber,
      reference_number: invoice.referenceNumber,
      order_number: invoice.orderNumber,
      terms: invoice.terms,
      notes: invoice.notes,
      is_inclusive_tax: invoice.isInclusiveTax,

      discount_total: invoice.discountTotal,
      tax_total: invoice.taxTotal,
      sub_total: invoice.subTotal,
      total: invoice.total,
      line_items: (invoice.LineItems ?? []).map(
        InvoiceLineItemDTO.toInvoiceLineItem,
      ),
    };
  }

  static toInvoiceCreate(
    invoice: any,
  ): InvoiceCreatableBasic & { lineItems: InvoiceLineItemCreatableBasic[] } {
    return {
      contactId: invoice.contact_id,
      invoiceNumber: invoice.invoice_number,
      referenceNumber: invoice.referenceNumber,
      orderNumber: invoice.orderNumber,
      terms: invoice.terms,
      notes: invoice.notes,
      isInclusiveTax: invoice.is_inclusive_tax,
      lineItems: invoice.line_items.map(
        InvoiceLineItemDTO.toInvoiceLineItemCreate,
      ),
    };
  }
}

type ToInvoiceDTOType = ReturnType<typeof InvoiceDTO.toInvoice>;
type ToInvoiceCreateType = ReturnType<typeof InvoiceDTO.toInvoiceCreate>;
export { InvoiceDTO };
export type { ToInvoiceCreateType, ToInvoiceDTOType };
