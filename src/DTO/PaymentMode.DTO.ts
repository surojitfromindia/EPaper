class PaymentModeDTO {
  static toPaymentMode({ payment_mode }) {
    return {
      payment_mode_id: payment_mode.id,
      name: payment_mode.name,
      system_name: payment_mode.systemName,
      is_default: payment_mode.isDefault,
    };
  }
}

export { PaymentModeDTO };
