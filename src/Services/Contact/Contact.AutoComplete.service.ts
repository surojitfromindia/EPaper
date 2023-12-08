import {
  AutoCompleteBasicType,
  IAutoCompleteAble,
} from "../AutoComplete.service";
import { ContactDao } from "../../DAO";

type ContactAutoCompleteType = AutoCompleteBasicType & {
  contactName: string;
};

class ContactAutoCompleteService
  implements IAutoCompleteAble<ContactAutoCompleteType>
{
  async fetchEntries({
    organization_id,
    search_text,
    search_option,
    limit_and_offset,
  }): Promise<Array<ContactAutoCompleteType>> {
    const { limit, offset } = limit_and_offset;
    const options: any = {
      organization_id: organization_id,
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

    const contactDao = new ContactDao({ organization_id });
    const contacts = await contactDao.getContactsAutoComplete(options);

    return contacts.map((contact) => ({
      id: contact.id as number,
      text: contact.contactName as string,
      contactName: contact.contactName,
    }));
  }
}

export { ContactAutoCompleteService };
