import { ContactPerson } from "../../Models";

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
}

export default ContactPersonDAO;
