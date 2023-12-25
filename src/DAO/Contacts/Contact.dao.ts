import {
  ContactPerson,
  Contacts,
  CurrencyModel,
  PaymentTermModel,
} from "../../Models";
import { FindAttributeOptions, Op } from "@sequelize/core";
import { ContactPersonType } from "../../Models/ContactPerson/ContactPerson.model";

const DEFAULT_CONTACT_CURRENCY_SELECTION = [
  "id",
  "currencyName",
  "currencySymbol",
  "currencyCode",
];
const DEFAULT_CONTACT_PAYMENT_TERM_SELECTION = ["id", "name"];

const DEFAULT_CONTACT_PERSON_SELECTION: FindAttributeOptions<ContactPersonType> =
  [
    "id",
    "salutation",
    "firstName",
    "lastName",
    "email",
    "phone",
    "mobile",
    "designation",
    "isPrimary",
  ];

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
          model: CurrencyModel,
          as: "Currency",
          attributes: DEFAULT_CONTACT_CURRENCY_SELECTION,
        },
        {
          model: PaymentTermModel,
          as: "PaymentTerm",
          attributes: DEFAULT_CONTACT_PAYMENT_TERM_SELECTION,
        },

        {
          model: ContactPerson,
          as: "ContactPersons",
          attributes: DEFAULT_CONTACT_PERSON_SELECTION,
        },
      ],
    });
  }

  async getContactDetailsRaw({ contact_id }) {
    return await Contacts.findOne({
      where: {
        id: contact_id,
        organizationId: this.organization_id,
      },
    });
  }

  async createContact({ contact_details }, { transaction }) {
    return await Contacts.create(
      {
        ...contact_details,
      },
      {
        transaction,
      },
    );
  }

  async updateContact({ contact_id, contact_details }, { transaction }) {
    return await Contacts.update(
      {
        ...contact_details,
      },
      {
        where: {
          id: contact_id,
          organizationId: this.organization_id,
        },
        transaction,
      },
    );
  }

  async getAllContactDetails() {
    return await Contacts.findAll({
      where: {
        organizationId: this.organization_id,
      },
      include: [
        {
          model: CurrencyModel,
          as: "Currency",
          attributes: DEFAULT_CONTACT_CURRENCY_SELECTION,
        },
        {
          model: PaymentTermModel,
          as: "PaymentTerm",
          attributes: DEFAULT_CONTACT_PAYMENT_TERM_SELECTION,
        },
      ],
      order: [["contactName", "ASC"]],
    });
  }

  async getContactPersonsOfContact({ contact_id }) {
    return await ContactPerson.findAll({
      where: {
        contactId: contact_id,
      },
      attributes: DEFAULT_CONTACT_PERSON_SELECTION,
    });
  }
}

export default ContactDao;
