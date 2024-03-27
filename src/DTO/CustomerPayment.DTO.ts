import { AutoNumberSeriesDTO, PaymentModeDTO } from ".";

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

  static toCustomerPaymentEditPage({
    deposit_to_accounts_list,
    payment_settings,
    payment_modes,
  }) {
    const basic_data = {
      deposit_to_accounts_list,
      payment_settings: CustomerPaymentSettingsDTO.toEditPageSettings({
        payment_settings,
      }),
      payment_modes: payment_modes.map((pm: any) =>
        PaymentModeDTO.toPaymentMode({ payment_mode: pm }),
      ),
    };

    return basic_data;
  }
}

export { CustomerPaymentDTO };

class CustomerPaymentSettingsDTO {
  static toFullSettings({ invoice_settings }) {}

  static toEditPageSettings({ payment_settings }) {
    const auto_number_groups = payment_settings.auto_number_groups.map((gp) =>
      AutoNumberSeriesDTO.toAutoNumberSeriesForSingleEntity(gp),
    );
    const default_auto_number_group =
      AutoNumberSeriesDTO.toAutoNumberSeriesForSingleEntity(
        payment_settings.default_auto_number_group,
      );
    // we need only the first element of
    return {
      is_auto_number_enabled: payment_settings.is_auto_number_enabled,
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
