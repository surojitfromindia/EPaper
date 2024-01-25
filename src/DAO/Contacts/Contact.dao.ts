import {
  ContactBalancesModel,
  ContactPerson,
  Contacts,
  CurrencyModel,
  PaymentTermModel,
} from "../../Models";
import { FindAttributeOptions, Op } from "@sequelize/core";
import { ContactPersonType } from "../../Models/ContactPerson/ContactPerson.model";
import { ValidityUtil } from "../../Utils/ValidityUtil";

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
class ContactDao {
  private readonly organization_id: number;

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
        {
          model: ContactPerson,
          as: "ContactPersons",
          attributes: DEFAULT_CONTACT_PERSON_SELECTION,
          where: {
            isPrimary: true,
          },
        },
        {
          model: ContactBalancesModel,
          as: "Balances",
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

  async updateBalances(
    {
      user_id,
      contact_id,
      currency_id,
      unused_credits_receivable_amount_change = 0,
      unused_credits_receivable_amount_bcy_change = 0,
      unused_credits_payable_amount_change = 0,
      unused_credits_payable_amount_bcy_change = 0,
      outstanding_credits_payable_amount_change = 0,
      outstanding_credits_payable_amount_bcy_change = 0,
      outstanding_credits_receivable_amount_change = 0,
      outstanding_credits_receivable_amount_bcy_change = 0,
    },
    { transaction },
  ) {
    let balance = await ContactBalancesModel.findOne({
      where: {
        contactId: contact_id,
        currencyId: currency_id,
        organizationId: this.organization_id,
      },
    });

    // if not found, create a new balance
    if (ValidityUtil.isEmpty(balance)) {
      const contact = await Contacts.findOne({
        where: {
          id: contact_id,
          organizationId: this.organization_id,
        },
        attributes: ["id", "contactType", "currencyId"],
      });
      const isDefault = contact.currencyId === currency_id;
      balance = await ContactBalancesModel.create(
        {
          contactId: contact_id,
          currencyId: currency_id,
          contactType: contact.contactType,
          isDefault,
          createdBy: user_id,
          organizationId: this.organization_id,
          unusedCreditsReceivableAmount: 0,
          bcyUnusedCreditsReceivableAmount: 0,
          unusedCreditsPayableAmount: 0,
          bcyUnusedCreditsPayableAmount: 0,
          outstandingCreditsPayableAmount: 0,
          bcyOutstandingCreditsPayableAmount: 0,
          outstandingCreditsReceivableAmount: 0,
          bcyOutstandingCreditsReceivableAmount: 0,
        },
        {
          transaction,
        },
      );
    }

    await balance.increment(
      {
        unusedCreditsReceivableAmount: unused_credits_receivable_amount_change,
        bcyUnusedCreditsReceivableAmount:
          unused_credits_receivable_amount_bcy_change,
        unusedCreditsPayableAmount: unused_credits_payable_amount_change,
        bcyUnusedCreditsPayableAmount: unused_credits_payable_amount_bcy_change,
        outstandingCreditsPayableAmount:
          outstanding_credits_payable_amount_change,
        bcyOutstandingCreditsPayableAmount:
          outstanding_credits_payable_amount_bcy_change,
        outstandingCreditsReceivableAmount:
          outstanding_credits_receivable_amount_change,
        bcyOutstandingCreditsReceivableAmount:
          outstanding_credits_receivable_amount_bcy_change,
      },
      {
        where: {
          contactId: contact_id,
          currencyId: currency_id,
        },
        transaction,
      },
    );
  }
}

export default ContactDao;
