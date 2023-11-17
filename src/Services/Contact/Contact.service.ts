import { ContactType } from "../../Models/Contact/Contacts.model";
import {
  AutoCompleteReturnType,
  IAutoCompleteAble,
} from "../AutoCompleteService";
import { ContactDao } from "../../DAO";

interface ContactAutoCompleteType extends Pick<ContactType, "contactName"> {}

class ContactService implements IAutoCompleteAble<ContactAutoCompleteType> {
  async fetchEntries({
    search_text,
    limit,
    offset,
    search_option,
  }): Promise<Array<ContactAutoCompleteType & AutoCompleteReturnType>> {
    const options: any = {
      organization_id: 1,
      skip: offset,
      next: limit,
      contactName: search_text,
    };
    if (search_option.contact_type === "customer") {
      options.contact_type = "customer";
    }
    if (search_option.contact_type === "vendor") {
      options.contact_type = "vendor";
    }

    const contacts = await ContactDao.getContactsAutoComplete(options);

    return contacts.map((contact) => ({
      id: contact.id,
      text: contact.contactName,
      contactName: contact.contactName,
    }));
  }
}

export default new ContactService();
export type { ContactAutoCompleteType };
