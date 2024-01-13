import { Includeable, Transaction } from "@sequelize/core";
import {
  AccountsOfOrganization,
  Contacts,
  CurrencyModel,
  Invoice,
  InvoiceLineItem,
  InvoicePaymentTerm,
  TaxRates,
} from "../../Models";
import {
  InvoiceCreatable,
  InvoiceIdType,
} from "../../Models/Invoice/Invoices.model";
import { AllowArray } from "@sequelize/core/_non-semver-use-at-your-own-risk_/utils/types.d.ts";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { ValidityUtil } from "../../Utils/ValidityUtil";

const INVOICE_CONTACT_DEFAULT_ATTRIBUTES = ["contactName"];
const INVOICE_LINE_ITEM_DEFAULT_ATTRIBUTES = [
  "id",
  "name",
  "description",
  "unit",
  "itemId",
  "productType",
  "accountId",
  "taxId",
  "unitId",
  "rate",
  "quantity",
  "discountPercentage",
  "discountAmount",
  "taxPercentage",
  "taxAmount",
  "itemTotal",
  "itemTotalTaxIncluded",
];
const INVOICE_CURRENCY_DEFAULT_ATTRIBUTES = [
  "id",
  "currencySymbol",
  "currencyCode",
];
type GetByIdFullOptions = {
  invoice_id: InvoiceIdType;
  organization_id: number;
  include_line_items?: boolean;
};

type GetByIdOptions = Pick<
  GetByIdFullOptions,
  "invoice_id" | "organization_id"
>;

type InvoiceUpdateProps = {
  invoice_id: InvoiceIdType;
  organization_id: OrganizationBasicIdType;
  invoice_details: InvoiceCreatable;
};

type InvoiceCreateProps = {
  invoice_details: InvoiceCreatable;
};

type InvoiceListProps = {
  organization_id: OrganizationBasicIdType;
};

class InvoiceDao {
  async create(
    { invoice_details }: InvoiceCreateProps,
    {
      transaction,
    }: {
      transaction: Transaction;
    },
  ) {
    return await Invoice.create(
      { ...invoice_details, syncStatus: "notSynced" },
      {
        transaction,
      },
    );
  }

  async getAll({ organization_id }: InvoiceListProps) {
    return await Invoice.findAll({
      where: {
        organizationId: organization_id,
        status: "active",
      },
      include: [
        {
          model: Contacts,
          as: "Contact",
          attributes: INVOICE_CONTACT_DEFAULT_ATTRIBUTES,
        },
        {
          model: CurrencyModel,
          as: "Currency",
          attributes: INVOICE_CURRENCY_DEFAULT_ATTRIBUTES,
        },
      ],
      order: [
        ["issue_date", "DESC"],
        ["id", "DESC"],
      ],
    });
  }

  async update(
    { invoice_id, organization_id, invoice_details }: InvoiceUpdateProps,
    {
      transaction,
    }: {
      transaction: Transaction;
    },
  ) {
    await Invoice.update(
      { ...invoice_details, syncStatus: "notSynced" },
      {
        where: {
          id: invoice_id,
          organizationId: organization_id,
          status: "active",
        },
        transaction,
      },
    );
    return this.getByIdWithLineItems({ invoice_id, organization_id });
  }

  async getByIdWithLineItems({ invoice_id, organization_id }: GetByIdOptions) {
    return this.#getInvoiceById({
      invoice_id,
      organization_id,
      include_line_items: true,
    });
  }

  async #getInvoiceById({
    invoice_id,
    organization_id,
    include_line_items,
  }: GetByIdFullOptions) {
    const includeAssociations: AllowArray<Includeable> = [
      {
        model: Contacts,
        as: "Contact",
        attributes: INVOICE_CONTACT_DEFAULT_ATTRIBUTES,
      },
      {
        model: InvoicePaymentTerm,
        as: "InvoicePaymentTerm",
      },
      {
        model: CurrencyModel,
        as: "Currency",
        attributes: INVOICE_CURRENCY_DEFAULT_ATTRIBUTES,
      },
    ];
    if (include_line_items) {
      includeAssociations.push({
        model: InvoiceLineItem,
        as: "LineItems",
        attributes: INVOICE_LINE_ITEM_DEFAULT_ATTRIBUTES,
        include: [
          {
            model: AccountsOfOrganization,
            as: "Account",
            attributes: ["name", "code"],
          },
          {
            model: TaxRates,
            as: "Tax",
            attributes: ["name", "rate"],
          },
        ],
      });
    }

    return await Invoice.findOne({
      where: {
        organizationId: organization_id,
        id: invoice_id,
        status: "active",
      },
      include: includeAssociations,
      order: [
        [
          {
            model: InvoiceLineItem,
            as: "LineItems",
          },
          "id",
        ],
      ],
    });
  }

  async isInvoiceNumberExists({ organization_id, invoice_number }) {
    const invoice = await Invoice.findOne({
      where: {
        organizationId: organization_id,
        invoiceNumber: invoice_number,
      },
      attributes: ["id", "invoiceNumber"],
    });
    return ValidityUtil.isNotEmpty(invoice);
  }
}

export default Object.freeze(new InvoiceDao());
