class CustomerPaymentDTO {
  static toCustomerPaymentCreate({
    customer_payment,
  }: {
    customer_payment: any;
  }) {
    return {
      contactId: customer_payment.contact_id,
      paymentNumber: customer_payment.payment_number ?? null,
      autoNumberGroupId: customer_payment.auto_number_group_id,
      issueDate: customer_payment.issue_date,
      exchangeRate: customer_payment.exchange_rate,
      invoices: (customer_payment.invoices ?? []).map(
        CustomerPaymentDTO.#toAppliedInvoiceCreate,
      ),
      referenceNumber: customer_payment.reference_number ?? null,
      amount: customer_payment.amount,
      accountId: customer_payment.account_id,
      bankCharges: customer_payment.bank_charges,
    };
  }

  static #toAppliedInvoiceCreate = (applied_invoice: any) => {
    return {
      invoiceId: applied_invoice.invoice_id,
      amountApplied: applied_invoice.amount_appiled,
    };
  };
}

export { CustomerPaymentDTO };
