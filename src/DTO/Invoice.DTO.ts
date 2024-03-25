import { AutoNumberSeriesDTO, ContactDTO, CurrencyDTO, InvoiceLineItemDTO, ItemUnitDTO, PaymentTermsDTO, TaxRateDTO } from './index';
import { InvoiceCreatableBasic, InvoiceType } from '../Models/Invoice/Invoices.model';
import { InvoiceLineItemCreatableBasic } from '../Models/Invoice/InvoiceLineItems.model';
import { DateUtil } from '../Utils/DateUtil';
import { DEFAULT_DATE_FORMAT } from '../Constants/DateFormat.Constant';
import { ValidityUtil } from '../Utils/ValidityUtil';
import { InvoiceDashboardData } from '../Services/./InvoiceServices/InvoiceDashBoard.service';

class InvoiceDTO {
  static toInvoiceEditPage({ taxes, units, payment_terms, line_item_accounts_list, invoice_details, contact, invoice_settings }) {
    const basic_data = {
      taxes: taxes.map(TaxRateDTO.toTaxRate),
      units: units.map(ItemUnitDTO.toItemUnit),
      payment_terms: payment_terms.map(PaymentTermsDTO.toPaymentTerm),
      line_item_accounts_list,
      invoice_settings: InvoiceSettingsDTO.toEditPageInvoiceSettings({
        invoice_settings,
      }),
    };
    if (invoice_details) {
      basic_data['invoice'] = InvoiceDTO.toInvoice({
        invoice: invoice_details,
      });
      basic_data['contact'] = ContactDTO.toContact(contact);
    }

    return basic_data;
  }

  static toInvoiceEditPageFromContact({ taxes, units, payment_terms, line_item_accounts_list, contact, invoice_settings }) {
    return {
      contact: ContactDTO.toContact(contact),
      taxes: taxes.map(TaxRateDTO.toTaxRate),
      units: units.map(ItemUnitDTO.toItemUnit),
      payment_terms: payment_terms.map(PaymentTermsDTO.toPaymentTerm),
      line_item_accounts_list,
      invoice_settings: InvoiceSettingsDTO.toEditPageInvoiceSettings({
        invoice_settings,
      }),
    };
  }

  static toInvoice({ invoice }: { invoice: InvoiceType }) {
    const return_data = {};

    Object.assign(return_data, {
      invoice_id: invoice.id,
      issue_date: invoice.issueDate,
      issue_date_formatted: DateUtil.Formatter(invoice.issueDate).format(DEFAULT_DATE_FORMAT),
      due_date: invoice.dueDate,
      due_date_formatted: DateUtil.Formatter(invoice.dueDate).format(DEFAULT_DATE_FORMAT),
      due_days: invoice.dueDays,
      contact_id: invoice.contactId,
      transaction_status: invoice.transactionStatus,
      transaction_status_formatted: transactionStatusFormatted(invoice.dueDays, invoice.transactionStatus, invoice.paymentStatus),
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
      exchange_rate: invoice.exchangeRate,
      balance: invoice.balance,
      payment_status: invoice.paymentStatus,
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
      const currency = CurrencyDTO.toCurrency(invoice.Currency);
      Object.assign(return_data, {
        ...currency,
        total_formatted: `${currency.currency_symbol}${invoice.total}`,
        sub_total_formatted: `${currency.currency_symbol}${invoice.subTotal}`,
        tax_total_formatted: `${currency.currency_symbol}${invoice.taxTotal}`,
        discount_total_formatted: `${currency.currency_symbol}${invoice.discountTotal}`,
        exchange_rate_formatted: `${invoice.exchangeRate}`,
        balance_formatted: `${currency.currency_symbol}${invoice.balance}`,
      });
    }

    return return_data;
  }

  static toInvoiceCreate(invoice: { [key: string]: any }): InvoiceCreatableBasic & {
    lineItems: InvoiceLineItemCreatableBasic[];
    paymentTermId?: number;
    autoNumberGroupId: number;
  } {
    return {
      contactId: invoice.contact_id,
      invoiceNumber: invoice.invoice_number ?? null,
      autoNumberGroupId: invoice.auto_number_group_id,
      issueDate: invoice.issue_date,
      dueDate: invoice.due_date,
      referenceNumber: invoice.referenceNumber ?? null,
      orderNumber: invoice.orderNumber ?? null,
      terms: invoice.terms ?? null,
      notes: invoice.notes ?? '',
      isInclusiveTax: invoice.is_inclusive_tax,
      paymentTermId: invoice.payment_term_id,
      transactionStatus: invoice.transaction_status,
      // these fields will not be stored in invoice table
      lineItems: invoice.line_items.map(InvoiceLineItemDTO.toInvoiceLineItemCreate),
      currencyId: invoice.currency_id,
      exchangeRate: invoice.exchange_rate,
    };
  }

  static toInvoiceUpdate(invoice: { [key: string]: any }): InvoiceCreatableBasic & {
    lineItems: InvoiceLineItemCreatableBasic[];
    paymentTermId?: number;
  } {
    return {
      contactId: invoice.contact_id,
      invoiceNumber: invoice.invoice_number,
      issueDate: invoice.issue_date,
      dueDate: invoice.due_date,
      referenceNumber: invoice.referenceNumber ?? '',
      orderNumber: invoice.orderNumber ?? '',
      terms: invoice.terms ?? '',
      notes: invoice.notes ?? '',
      isInclusiveTax: invoice.is_inclusive_tax,
      transactionStatus: invoice.transaction_status,
      lineItems: invoice.line_items.map(InvoiceLineItemDTO.toInvoiceLineItemUpdate),
      paymentTermId: invoice.payment_term_id ?? '',
      currencyId: invoice.currency_id,
      exchangeRate: invoice.exchange_rate,
    };
  }

  static toInvoiceDashboard({ dash_board_data }: { dash_board_data: InvoiceDashboardData }) {
    const basic_data = {
      due_today: dash_board_data.due_today,
      due_within_30_days: dash_board_data.due_within_30_days,
      total_overdue: dash_board_data.total_overdue,
      total_outstanding: dash_board_data.total_outstanding,
    };
    if (ValidityUtil.isNotEmpty(dash_board_data.Currency)) {
      const currency = CurrencyDTO.toCurrency(dash_board_data.Currency);
      Object.assign(basic_data, {
        currency_symbol: currency.currency_symbol,
        due_today_formatted: `${currency.currency_symbol}${dash_board_data.due_today}`,
        due_within_30_days_formatted: `${currency.currency_symbol}${dash_board_data.due_within_30_days}`,
        total_overdue_formatted: `${currency.currency_symbol}${dash_board_data.total_overdue}`,
        total_outstanding_formatted: `${currency.currency_symbol}${dash_board_data.total_outstanding}`,
      });
    }
    return basic_data;
  }
}
type ToInvoiceCreateType = ReturnType<typeof InvoiceDTO.toInvoiceCreate>;
type ToInvoiceUpdateType = ReturnType<typeof InvoiceDTO.toInvoiceUpdate>;

class InvoiceSettingsDTO {
  static toFullInvoiceSettings({ invoice_settings }) {}

  static toEditPageInvoiceSettings({ invoice_settings }) {
    const auto_number_groups = invoice_settings.auto_number_groups.map((gp) => AutoNumberSeriesDTO.toAutoNumberSeriesForSingleEntity(gp));
    const default_auto_number_group = AutoNumberSeriesDTO.toAutoNumberSeriesForSingleEntity(invoice_settings.default_auto_number_group);
    // we need only the first element of
    return {
      is_auto_number_enabled: invoice_settings.is_auto_number_enabled,
      auto_number_groups,
      default_auto_number_group,
    };
  }

  static toAutoNumberUpdatePayload({ update_payload }) {
    return {
      isAutoNumberEnabled: update_payload.is_auto_number_enabled,
      autoNumberGroupId: update_payload.auto_number_group_id,
      nextNumber: update_payload.next_number,
      prefixString: update_payload.prefix_string,
    };
  }
}

type ToInvoiceAutoNumberUpdatePayloadType = ReturnType<typeof InvoiceSettingsDTO.toAutoNumberUpdatePayload>;
type ToInvoiceEditPageInvoiceSettingsType = ReturnType<typeof InvoiceSettingsDTO.toEditPageInvoiceSettings>;
type ToInvoiceFullInvoiceSettingsType = ReturnType<typeof InvoiceSettingsDTO.toFullInvoiceSettings>;

export type { ToInvoiceCreateType, ToInvoiceUpdateType };
export type { ToInvoiceAutoNumberUpdatePayloadType, ToInvoiceEditPageInvoiceSettingsType, ToInvoiceFullInvoiceSettingsType };

export { InvoiceDTO, InvoiceSettingsDTO };

const transactionStatusFormatted = (due_days: number, transaction_status: string, payment_status: string) => {
  // first check if payment statu is "paid" then it is paid
  if (payment_status === 'paid') {
    return 'Paid';
  }
  if (payment_status==="partial_paid"){
    return "Partial paid"
  }
  switch (transaction_status) {
    case 'draft':
      return 'Draft';
    case 'void':
      return 'Void';
    case 'sent': {
      if (due_days > 0) {
        return `due in ${due_days} days`;
      } else if (due_days < 0) {
        return `due ${Math.abs(due_days)} days ago`;
      } else {
        return 'due today';
      }
    }
    default:
      return 'Draft';
  }
};
