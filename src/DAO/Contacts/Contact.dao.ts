import { Contacts, Currency } from "../../Models";
import { Op } from "@sequelize/core";

type GetContactsAutoCompleteParamsType = {
  organization_id: number;
  skip: number;
  next: number;
  contactType: "customer" | "vendor";
  contactName?: string;
};

type ContactForInvoiceReturnType = {
  id: number;
  contactName: string;
  currencyId: number;
  Currency: {
    id: number;
    currencyName: string;
    currencySymbol: string;
  };
};
class ContactDao {
  private organization_id: number;

  constructor({ organization_id }: { organization_id: number }) {
    this.organization_id = organization_id;
  }

  getContactsAutoComplete({
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
        organizationId: this.organization_id,
        status: "active",
        // contactName starts with and is case-insensitive
        contactName: {
          [Op.like]: contactName + "%",
        },
        ...extra_condition,
      },
      attributes: ["id", "contactName"],
      order: [["contactName", "ASC"]],
      limit: next,
      offset: skip,
    });
  }

  async getContactDetails({ contact_id }) {
    return await Contacts.findOne({
      where: {
        id: contact_id,
        organizationId: this.organization_id,
      },
      include: [
        {
          model: Currency,
          as: "Currency",
          attributes: ["id", "currencyName", "currencySymbol"],
        },
      ],
      attributes: ["id", "contactName", "currencyId"],
    });
  }
}

export default ContactDao;
