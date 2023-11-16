import { ContactType } from "../../Models/Contact/Contacts.model";
import {
  AutoCompleteReturnType,
  IAutoCompleteAble,
} from "./AutoCompleteService";
import { ContactDao } from "../../DAO";

interface ContactAutoCompleteType extends Pick<ContactType, "contactName"> {}

class ContactService implements IAutoCompleteAble<ContactAutoCompleteType> {
  async fetchEntries({
    search_text,
    limit,
    offset,
  }): Promise<Array<ContactAutoCompleteType & AutoCompleteReturnType>> {
    const contacts = await ContactDao.getContactsAutoComplete({
      organization_id: 1,
      skip: offset,
      next: limit,
    });

    return contacts.map((contact) => ({
      id: contact.id,
      text: contact.contactName,
      contactName: contact.contactName,
    }));
  }
}

export default new ContactService();
