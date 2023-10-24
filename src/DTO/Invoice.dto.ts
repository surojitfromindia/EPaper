import {
  InvoiceLineItemDTO,
  ItemUnitDTO,
  PaymentTermsDTO,
  TaxRateDTO,
} from "./index";
import {
  InvoiceCreatableBasic,
  InvoiceType,
} from "../Models/Invoice/Invoices.model";
import { InvoiceLineItemCreatableBasic } from "../Models/Invoice/InvoiceLineItems.model";

class InvoiceDTO {
  static toInvoiceEditPage({
    taxes,
    units,
    payment_terms,
    line_item_accounts_list,
  }) {
    return {
      taxes: taxes.map(TaxRateDTO.toTaxRate),
      units: units.map(ItemUnitDTO.toItemUnit),
      payment_terms: payment_terms.map(PaymentTermsDTO.toPaymentTerm),
      line_item_accounts_list,
    };
  }

  static toInvoice(invoice: InvoiceType) {
    const basic = {
      invoice_id: invoice.id,
      issue_date: invoice.issueDate,
      due_date: invoice.dueDate,
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
    };
    if (invoice.InvoicePaymentTerm) {
      const invoicePaymentTerm = invoice.InvoicePaymentTerm;
      basic["payment_term_name"] = invoicePaymentTerm.name;
      basic["payment_term"] = invoicePaymentTerm.paymentTerm;
      basic["payment_term_interval"] = invoicePaymentTerm.interval;
    }
    if (invoice.LineItems) {
      basic["line_items"] = (invoice.LineItems ?? []).map(
        InvoiceLineItemDTO.toInvoiceLineItem,
      );
    }
    return basic;
  }

  static toInvoiceCreate(invoice: any): InvoiceCreatableBasic & {
    lineItems: InvoiceLineItemCreatableBasic[];
    paymentTermId?: number;
  } {
    return {
      contactId: invoice.contact_id,
      invoiceNumber: invoice.invoice_number,
      issueDate: invoice.issue_date,
      dueDate: invoice.due_date,
      referenceNumber: invoice.referenceNumber,
      orderNumber: invoice.orderNumber,
      terms: invoice.terms,
      notes: invoice.notes,
      isInclusiveTax: invoice.is_inclusive_tax,
      // these fields will not be stored in invoice table
      lineItems: invoice.line_items.map(
        InvoiceLineItemDTO.toInvoiceLineItemCreate,
      ),
      paymentTermId: invoice.payment_term_id,
    };
  }

  static toInvoiceUpdate(invoice: any): InvoiceCreatableBasic & {
    lineItems: InvoiceLineItemCreatableBasic[];
    paymentTermId?: number;
  } {
    return {
      contactId: invoice.contact_id,
      invoiceNumber: invoice.invoice_number,
      issueDate: invoice.issue_date,
      dueDate: invoice.due_date,
      referenceNumber: invoice.referenceNumber,
      orderNumber: invoice.orderNumber,
      terms: invoice.terms,
      notes: invoice.notes,
      isInclusiveTax: invoice.is_inclusive_tax,
      lineItems: invoice.line_items.map(
        InvoiceLineItemDTO.toInvoiceLineItemUpdate,
      ),
      paymentTermId: invoice.payment_term_id,
    };
  }
}
type ToInvoiceCreateType = ReturnType<typeof InvoiceDTO.toInvoiceCreate>;
export { InvoiceDTO };
export type { ToInvoiceCreateType };
