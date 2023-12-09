import { AutoCompleteBasicType } from "../AutoComplete.service";
import { ContactDao } from "../../DAO";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";

type ContactAutoCompleteType = AutoCompleteBasicType & {
  contactName: string;
};

class ContactService {
  private clientInfo: ClientInfo;

  constructor({ client_info }: { client_info: any }) {
    this.clientInfo = client_info;
  }

  async getContactById({ contact_id }) {
    const contactDao = new ContactDao({
      organization_id: this.clientInfo.organizationId,
    });
    return await contactDao.getContactDetails({ contact_id });
  }

  async getContactByIdRaw({ contact_id }) {
    const contactDao = new ContactDao({
      organization_id: this.clientInfo.organizationId,
    });
    return await contactDao.getContactDetailsRaw({ contact_id });
  }
}

export { ContactService };
export type { ContactAutoCompleteType };
