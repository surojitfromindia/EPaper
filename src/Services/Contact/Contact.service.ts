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

      await this.#contactPersonStateHandle(
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

  async updateContact({ contact_id, contact_details }) {
    const contactDao = new ContactDao({
      organization_id: this.clientInfo.organizationId,
    });
    await sequelize.transaction(async (t1) => {
      const oldContactPersons = await contactDao.getContactPersonsOfContact({
        contact_id,
      });

      const updatedContact = await contactDao.updateContact(
        { contact_details: contact_details, contact_id },
        { transaction: t1 },
      );

      await this.#contactPersonStateHandle(
        {
          contact_id: contact_id,
          new_contact_persons: contact_details.contactPersons,
          old_contact_persons: oldContactPersons,
        },
        { transaction: t1 },
      );

      return updatedContact;
    });
    return contactDao.getContactDetails({ contact_id });
  }

  #contactPersonStateHandle = async (
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
      key_for_second_array: "id",
    });
    const creatableContactPersonsDetails = creatableContactPersons.map(
      (contact_person) => ({
        ...contact_person,
        createdBy: this.clientInfo.userId,
        organizationId: this.clientInfo.organizationId,
        contactId: contact_id,
      }),
    );
    const deletableContactPersons = ComparisonUtil.getEntriesNotInFirstArray({
      first_array: new_contact_persons,
      second_array: old_contact_persons,
      key_for_first_array: "id",
      key_for_second_array: "id",
    });
    const updatableContactPersons = ComparisonUtil.getEntriesIfMatched({
      array: new_contact_persons,
      ids: old_contact_persons.map((cp) => cp.id),
      id_key: "id",
    });

    //  if no isPrimary key is present in create or update payload, then set the first one as primary
    const isNewCPsHasPrimary = creatableContactPersonsDetails.some(
      (cp) => cp.isPrimary === true,
    );
    const isUpdateCPsHasPrimary = updatableContactPersons.some(
      (cp) => cp.isPrimary === true,
    );

    if (updatableContactPersons.length > 0 && !isUpdateCPsHasPrimary) {
      updatableContactPersons[0].isPrimary = true;
    }
    if (
      creatableContactPersonsDetails.length > 0 &&
      !isUpdateCPsHasPrimary &&
      !isNewCPsHasPrimary
    ) {
      creatableContactPersonsDetails[0].isPrimary = true;
    }

    console.log("creatableContactPersons", creatableContactPersons);
    console.log("deletableContactPersons", deletableContactPersons);
    console.log("updatableContactPersons", updatableContactPersons);

    const contactPersonDao = new ContactPersonDAO({
      organization_id: this.clientInfo.organizationId,
    });
    if (creatableContactPersonsDetails.length > 0) {
      await contactPersonDao.createContactPersons(
        { contact_persons: creatableContactPersonsDetails },
        { transaction },
      );
    }

    if (deletableContactPersons.length > 0) {
      await contactPersonDao.deleteContactPersons(
        { contact_person_ids: deletableContactPersons.map((cp) => cp.id) },
        { transaction },
      );
    }
    if (updatableContactPersons.length > 0) {
      // for each of updatable contact persons, update the contact person
      await Promise.all(
        updatableContactPersons.map((cp) =>
          contactPersonDao.updateAContactPerson(
            {
              contact_person_id: cp.id,
              contact_id: contact_id,
              contact_person_details: cp,
            },
            { transaction },
          ),
        ),
      );
    }

    return true;
  };
}

export { ContactService };
export type { ContactAutoCompleteType };
