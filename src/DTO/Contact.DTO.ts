import { ContactAutoCompleteType } from "../Services/Contact/Contact.service";
import { ValidityUtil } from "../Utils/ValidityUtil";
import { ContactType } from "../Models/Contact/Contacts.model";
import { CurrencyDTO } from "./Currency.DTO";
import { PaymentTermsDTO } from "./PaymentTerms.DTO";
import { TaxRateDTO } from "./TaxRate.DTO";

class ContactDTO {
  static toTransactionContact(contact_details: any) {
    return {
      contact_id: contact_details.id,
      contact_name: contact_details.contactName,
    };
  }

  static toAutoCompleteContact(auto_complete_details: ContactAutoCompleteType) {
    return {
      contact_name: auto_complete_details.contactName,
      id: auto_complete_details.id,
      text: auto_complete_details.text,
    };
  }

  static toContact(contact_details: ContactType) {
    const basic_payload: any = {
      contact_id: contact_details.id,
      contact_name: contact_details.contactName,
      status: contact_details.status,
      currency_id: contact_details.currencyId,
      payment_term_id: contact_details.paymentTermId,
      remarks: contact_details.remarks,
      contact_type: contact_details.contactType,
      contact_sub_type: contact_details.contactSubType,
    };
    if (ValidityUtil.isNotEmpty(contact_details.Currency)) {
      Object.assign(basic_payload, {
        ...CurrencyDTO.toCurrency(contact_details.Currency),
      });
    }
    if (ValidityUtil.isNotEmpty(contact_details.PaymentTerm)) {
      Object.assign(basic_payload, {
        ...PaymentTermsDTO.toPaymentTerm(contact_details.PaymentTerm),
      });
    }
    return basic_payload;
  }

  static toContactCreate(contact_payload: any) {
    return {
      contactName: contact_payload.contact_name,
      companyName: contact_payload.company_name,
      currencyId: contact_payload.currency_id,
      paymentTermId: contact_payload.payment_term_id,
      remarks: contact_payload.remarks,
      contactType: contact_payload.contact_type,
      contactSubType: contact_payload.contact_sub_type,
    };
  }

  static toContactEditPage({ taxes, payment_terms, contact, currencies }) {
    const basic_data = {
      taxes: taxes.map(TaxRateDTO.toTaxRate),
      payment_terms: payment_terms.map(PaymentTermsDTO.toPaymentTerm),
      currencies: currencies.map(CurrencyDTO.toCurrency),
    };
    if (contact) {
      basic_data["contact"] = ContactDTO.toContact(contact);
    }

    return basic_data;
  }
}

export { ContactDTO };
