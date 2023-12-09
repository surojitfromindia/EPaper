import {
  ContactDTO,
  CurrencyDTO,
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
import { ValidityUtil } from "../Utils/ValidityUtil";

class InvoiceDTO {
  static toInvoiceEditPage({
    taxes,
    units,
    payment_terms,
    line_item_accounts_list,
    invoice_details,
    contact,
  }) {
    const basic_data = {
      taxes: taxes.map(TaxRateDTO.toTaxRate),
      units: units.map(ItemUnitDTO.toItemUnit),
      payment_terms: payment_terms.map(PaymentTermsDTO.toPaymentTerm),
      line_item_accounts_list,
    };
    if (invoice_details) {
      basic_data["invoice"] = InvoiceDTO.toInvoice({
        invoice: invoice_details,
      });
      basic_data["contact"] = ContactDTO.toContact(contact);
    }

    return basic_data;
  }

  static toInvoiceEditPageFromContact({ contact }) {
    return {
      contact: ContactDTO.toContact(contact),
    };
  }

  static toInvoice({ invoice }: { invoice: InvoiceType }) {
    const return_data = {};

    Object.assign(return_data, {
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
      transaction_status: invoice.transactionStatus,
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
    });
    if (invoice.Contact) {
      const contact = ContactDTO.toTransactionContact(invoice.Contact);
      Object.assign(return_data, {
        contact_name: contact.contact_name,
      });
    }
    if (invoice.InvoicePaymentTerm) {
      const invoicePaymentTerm = invoice.InvoicePaymentTerm;
      Object.assign(return_data, {
        payment_term_id: invoicePaymentTerm.originPaymentTermId,
        payment_term_name: invoicePaymentTerm.name,
        payment_term: invoicePaymentTerm.paymentTerm,
        payment_term_interval: invoicePaymentTerm.interval,
      });
    }
    if (invoice.LineItems) {
      Object.assign(return_data, {
        line_items: invoice.LineItems.map(InvoiceLineItemDTO.toInvoiceLineItem),
      });
    }
    if (ValidityUtil.isNotEmpty(invoice.Currency)) {
      Object.assign(return_data, {
        ...CurrencyDTO.toCurrency(invoice.Currency),
      });
    }

    return return_data;
  }

  static toInvoiceCreate(invoice: {
    [key: string]: any;
  }): InvoiceCreatableBasic & {
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
      paymentTermId: invoice.payment_term_id,
      transactionStatus: invoice.transaction_status,
      // these fields will not be stored in invoice table
      lineItems: invoice.line_items.map(
        InvoiceLineItemDTO.toInvoiceLineItemCreate,
      ),
      currencyId: invoice.currency_id,
    };
  }

  static toInvoiceUpdate(invoice: {
    [key: string]: any;
  }): InvoiceCreatableBasic & {
    lineItems: InvoiceLineItemCreatableBasic[];
    paymentTermId?: number;
  } {
    return {
      contactId: invoice.contact_id,
      invoiceNumber: invoice.invoice_number,
      issueDate: invoice.issue_date,
      dueDate: invoice.due_date,
      referenceNumber: invoice.referenceNumber ?? "",
      orderNumber: invoice.orderNumber ?? "",
      terms: invoice.terms ?? "",
      notes: invoice.notes ?? "",
      isInclusiveTax: invoice.is_inclusive_tax,
      transactionStatus: invoice.transaction_status,
      lineItems: invoice.line_items.map(
        InvoiceLineItemDTO.toInvoiceLineItemUpdate,
      ),
      paymentTermId: invoice.payment_term_id ?? "",
      currencyId: invoice.currency_id,
    };
  }
}
type ToInvoiceCreateType = ReturnType<typeof InvoiceDTO.toInvoiceCreate>;
export { InvoiceDTO };
export type { ToInvoiceCreateType };
