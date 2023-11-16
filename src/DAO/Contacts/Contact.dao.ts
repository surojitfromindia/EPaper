import { Contacts } from "../../Models";

class ContactDao {
  static getContactsAutoComplete({ organization_id, skip, next }) {
    return Contacts.findAll({
      where: {
        organizationId: organization_id,
        status: "active",
      },
      attributes: ["id", "contactName"],
      limit: next,
      offset: skip,
    });
  }
}

export default ContactDao;
