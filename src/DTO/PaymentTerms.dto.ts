import { PaymentTermType } from "../Models/PaymentTerm/PaymentTerms.model";

class PaymentTermsDTO {
  static toPaymentTerm(payment_term: PaymentTermType) {
    return {
      payment_term_id: payment_term.id,
      name: payment_term.name,
      payment_term: payment_term.paymentTerm,
      is_default: payment_term.isDefault,
      interval: payment_term.interval,
    };
  }

  static toInvoicePaymentTerm(payment_term: any) {
    return {
      name: payment_term.name,
      payment_term: payment_term.paymentTerm,
      interval: payment_term.interval,
    };
  }

  static toPaymentTermCreate(payment_term_body: any) {
    return {
      name: payment_term_body.name,
      paymentTerm: payment_term_body.payment_term,
      isDefault: payment_term_body.is_default,
      interval: payment_term_body.interval,
    };
  }

  static toPaymentTermUpdate(payment_term_body: any) {
    return {
      name: payment_term_body.name,
      paymentTerm: payment_term_body.payment_term,
      isDefault: payment_term_body.is_default,
      interval: payment_term_body.interval,
    };
  }
}

export { PaymentTermsDTO };
