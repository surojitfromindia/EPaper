type CustomerPaymentCreateDTO = {
  contactId: number;
  paymentNumber: string | null;
  autoNumberGroupId: number;
  issueDate: string;
  exchangeRate: number;
  currencyId: number;
  invoices: AppliedInvoiceCreateDTO[];
  referenceNumber: string | null;
  amount: number;
  accountId: number;
  bankCharges: number;
  notes?: string;
  paymentModeId?: number;
};

type AppliedInvoiceCreateDTO = {
  invoiceId: number;
  amountApplied: number;
};

class CustomerPaymentDTO {
  static toCustomerPaymentCreate({
    customer_payment,
  }: {
    customer_payment: any;
  }): CustomerPaymentCreateDTO {
    return {
      contactId: customer_payment.contact_id,
      paymentNumber: customer_payment.payment_number ?? null,
      autoNumberGroupId: customer_payment.auto_number_group_id,
      issueDate: customer_payment.issue_date,
      exchangeRate: customer_payment.exchange_rate ?? 1,
      currencyId: customer_payment.currency_id,
      invoices: (customer_payment.invoices ?? []).map(
        CustomerPaymentDTO.#toAppliedInvoiceCreate,
      ),
      referenceNumber: customer_payment.reference_number ?? "",
      amount: customer_payment.amount,
      accountId: customer_payment.account_id,
      bankCharges: customer_payment.bank_charges ?? 0,
      notes: customer_payment.notes ?? "",
      paymentModeId: customer_payment.payment_mode_id,
    };
  }

  static #toAppliedInvoiceCreate = (
    applied_invoice: any,
  ): AppliedInvoiceCreateDTO => {
    return {
      invoiceId: applied_invoice.invoice_id,
      amountApplied: applied_invoice.amount_appiled,
    };
  };
}

export { CustomerPaymentDTO };
