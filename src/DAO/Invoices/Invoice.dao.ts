import { Includeable, Transaction } from "@sequelize/core";
import { Contacts, Invoice, InvoiceLineItem } from "../../Models";
import {
  InvoiceCreatable,
  InvoiceIdType,
} from "../../Models/Invoice/Invoices.model";
import { AllowArray } from "@sequelize/core/_non-semver-use-at-your-own-risk_/utils/types.d.ts";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";

const INVOICE_CONTACT_DEFAULT_ATTRIBUTES = ["contactName"];
const INVOICE_LINE_ITEM_DEFAULT_ATTRIBUTES = [
  "id",
  "name",
  "description",
  "unit",
  "itemId",
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
type GetByIdFullOptions = {
  invoice_id: InvoiceIdType;
  organization_id: number;
  include_branch?: boolean;
  include_line_items?: boolean;
};

type GetByIdOptions = Pick<
  GetByIdFullOptions,
  "invoice_id" | "organization_id" | "include_branch"
>;

type InvoiceUpdateProps = {
  invoice_id: InvoiceIdType;
  organization_id: OrganizationBasicIdType;
  invoice_details: InvoiceCreatable;
};

class InvoiceDao {
  async create(
    {
      invoice_details,
    }: {
      invoice_details: InvoiceCreatable;
    },
    {
      transaction,
    }: {
      transaction: Transaction;
    },
  ) {
    return await Invoice.create(invoice_details, {
      transaction,
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
    await Invoice.update(invoice_details, {
      where: {
        id: invoice_id,
        organizationId: organization_id,
        status: "active",
      },
      transaction,
    });
    return this.getByIdWithLineItems({ invoice_id, organization_id });
  }

  async getById({
    invoice_id,
    include_branch,
    organization_id,
  }: GetByIdOptions) {
    return this.#getInvoiceById({
      invoice_id,
      organization_id,
      include_branch,
    });
  }

  async getByIdWithLineItems({
    invoice_id,
    include_branch,
    organization_id,
  }: GetByIdOptions) {
    return this.#getInvoiceById({
      invoice_id,
      organization_id,
      include_branch,
      include_line_items: true,
    });
  }

  async #getInvoiceById({
    invoice_id,
    organization_id,
    include_branch,
    include_line_items,
  }: GetByIdFullOptions) {
    const includeAssociations: AllowArray<Includeable> = [
      {
        model: Contacts,
        as: "Contact",
        attributes: INVOICE_CONTACT_DEFAULT_ATTRIBUTES,
      },
    ];
    if (include_line_items) {
      includeAssociations.push({
        model: InvoiceLineItem,
        as: "LineItems",
        attributes: INVOICE_LINE_ITEM_DEFAULT_ATTRIBUTES,
      });
    }

    return await Invoice.findOne({
      where: {
        organizationId: organization_id,
        id: invoice_id,
        status: "active",
      },
      include: includeAssociations,
    });
  }
}

export default Object.freeze(new InvoiceDao());
