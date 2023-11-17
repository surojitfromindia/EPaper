import { Contacts } from "../../Models";

type GetContactsAutoCompleteParamsType = {
  organization_id: number;
  skip: number;
  next: number;
  contactType: "customer" | "vendor";
  contactName?: string;
};
class ContactDao {
  static getContactsAutoComplete({
    organization_id,
    skip,
    next,
    contactType,
    contactName,
  }: GetContactsAutoCompleteParamsType) {
    const extra_condition: any = {};
    if (contactType) {
      extra_condition.contactType = contactType;
    }

    return Contacts.findAll({
      where: {
        organizationId: organization_id,
        status: "active",
        ...extra_condition,
      },
      attributes: ["id", "contactName"],
      limit: next,
      offset: skip,
    });
  }
}

export default ContactDao;
