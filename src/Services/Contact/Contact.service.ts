import { AutoCompleteBasicType } from "../AutoComplete.service";
import { ContactDao } from "../../DAO";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import sequelize from "../../Config/DataBase.Config";

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

  async createContact({ contact_details }) {
    const contactDao = new ContactDao({
      organization_id: this.clientInfo.organizationId,
    });
    const createdContact = await sequelize.transaction(async (t1) => {
      const newContact = {
        ...contact_details,
        organizationId: this.clientInfo.organizationId,
        createdBy: this.clientInfo.userId,
      };
      return await contactDao.createContact(
        { contact_details: newContact },
        { transaction: t1 },
      );
    });
    return contactDao.getContactDetails({ contact_id: createdContact.id });
  }

  async getAllContactDetails() {
    const contactDao = new ContactDao({
      organization_id: this.clientInfo.organizationId,
    });
    return await contactDao.getAllContactDetails();
  }
}

export { ContactService };
export type { ContactAutoCompleteType };
