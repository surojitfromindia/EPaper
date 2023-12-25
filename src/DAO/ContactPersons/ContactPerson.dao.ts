import { ContactPerson } from "../../Models";
import { ContactPersonCreatableType } from "../../Models/ContactPerson/ContactPerson.model";

type BulkUpdateAllowedFields = Omit<
  ContactPersonCreatableType,
  "organizationId" | "id" | "contactId"
>;
const bulkUpdateAllowedFields: Required<keyof BulkUpdateAllowedFields>[] = [
  "salutation",
  "firstName",
  "lastName",
  "email",
  "phone",
  "mobile",
  "designation",
  "isPrimary",
];

class ContactPersonDAO {
  private organization_id: number;

  constructor({ organization_id }: { organization_id: number }) {
    this.organization_id = organization_id;
  }

  async createContactPersons({ contact_persons }, { transaction }) {
    return await ContactPerson.bulkCreate(contact_persons, {
      transaction,
    });
  }

  async deleteContactPersons({ contact_person_ids }, { transaction }) {
    return await ContactPerson.destroy({
      where: {
        id: contact_person_ids,
        organizationId: this.organization_id,
      },
      transaction,
    });
  }

  async updateAContactPerson(
    { contact_person_id, contact_id, contact_person_details },
    { transaction },
  ) {
    return await ContactPerson.update(contact_person_details, {
      where: {
        id: contact_person_id,
        contactId: contact_id,
        organizationId: this.organization_id,
      },
      transaction,
    });
  }
}

export default ContactPersonDAO;
