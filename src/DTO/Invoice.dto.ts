import {
  ContactDTO,
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
import { DateUtil } from "../Utils/DateUtil";
import { DEFAULT_DATE_FORMAT } from "../Constants/DateFormat.Constant";

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

  static toInvoice({ invoice }: { invoice: InvoiceType }) {
    const basic = {
      invoice_id: invoice.id,
      issue_date: invoice.issueDate,
      issue_date_formatted: DateUtil.Formatter(invoice.issueDate).format(
        DEFAULT_DATE_FORMAT,
      ),
      due_date: invoice.dueDate,
      due_date_formatted: DateUtil.Formatter(invoice.dueDate).format(
        DEFAULT_DATE_FORMAT,
      ),
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
    if (invoice.Contact) {
      const contact = ContactDTO.toTransactionContact(invoice.Contact);
      basic["contact_name"] = contact.contact_nane;
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
