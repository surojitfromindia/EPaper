import { ContactAutoCompleteType } from "../Services/Contact/Contact.service";

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
}

export { ContactDTO };
