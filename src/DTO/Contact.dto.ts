import { ContactAutoCompleteType } from "../Services/Contact/Contact.service";
import { ValidityUtil } from "../Utils/ValidityUtil";
import { ContactType } from "../Models/Contact/Contacts.model";
import { CurrencyDTO } from "./Currency.DTO";

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
    };
    if (ValidityUtil.isNotEmpty(contact_details.Currency)) {
      Object.assign(basic_payload, {
        ...CurrencyDTO.toCurrency(contact_details.Currency),
      });
    }
    return basic_payload;
  }
}

export { ContactDTO };
