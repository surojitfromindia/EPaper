import { AutoCompleteBasicType } from "../AutoComplete.service";
import { ContactDao, ContactPersonDAO } from "../../DAO";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import sequelize from "../../Config/DataBase.Config";
import { ComparisonUtil } from "../../Utils/ComparisonUtil";
import { ContactCreatePayload } from "../../DTO/Contact.DTO";

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

  async createContact({
    contact_details,
  }: {
    contact_details: ContactCreatePayload;
  }) {
    const contactDao = new ContactDao({
      organization_id: this.clientInfo.organizationId,
    });
    const createdContact = await sequelize.transaction(async (t1) => {
      const newContact = {
        ...contact_details,
        organizationId: this.clientInfo.organizationId,
        createdBy: this.clientInfo.userId,
      };
      const createdContact = await contactDao.createContact(
        { contact_details: newContact },
        { transaction: t1 },
      );

      await this.#createOrUpdateContactPersonsOfContact(
        {
          contact_id: createdContact.id,
          new_contact_persons: contact_details.contactPersons,
          old_contact_persons: [],
        },
        { transaction: t1 },
      );

      return createdContact;
    });
    return contactDao.getContactDetails({ contact_id: createdContact.id });
  }

  async getAllContactDetails() {
    const contactDao = new ContactDao({
      organization_id: this.clientInfo.organizationId,
    });
    return await contactDao.getAllContactDetails();
  }

  #createOrUpdateContactPersonsOfContact = async (
    {
      contact_id,
      new_contact_persons,
      old_contact_persons,
    }: {
      contact_id: number;
      new_contact_persons: any[];
      old_contact_persons: any[];
    },
    { transaction },
  ) => {
    const creatableContactPersons = ComparisonUtil.getEntriesNotInFirstArray({
      first_array: old_contact_persons,
      second_array: new_contact_persons,
      key_for_first_array: "id",
      key_for_second_array: "contact_person_id",
    });
    const creatableContactPersonsDetails = creatableContactPersons.map(
      (contact_person) => ({
        ...contact_person,
        createdBy: this.clientInfo.userId,
        organizationId: this.clientInfo.organizationId,
        contactId: contact_id,
      }),
    );
    const contactPersonDao = new ContactPersonDAO({
      organization_id: this.clientInfo.organizationId,
    });
    await contactPersonDao.createContactPersons(
      { contact_persons: creatableContactPersonsDetails },
      { transaction },
    );
    return true;
  };
}

export { ContactService };
export type { ContactAutoCompleteType };
