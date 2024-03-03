import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { Contacts } from "../Contact/Contacts.model";
import { Invoice } from "./Invoices.model";
import { InvoiceLineItem } from "./InvoiceLineItems.model";
import { AccountsOfOrganization } from "../Account/AccountsOfOrganization.model";
import { OrganizationBasic } from "../Organization/Organization.model";

/**
 * each row represents a journal entry for a line item in an invoice
 * each line item can have multiple journal entries for different accounts.
 * e.g., if the line item has discount, tax, etc. we track each of those as a separate accounts
 * all row will have exact amount of data from the line item like invoice_id, line_item_id, etc.
 * we can also store branch_id, organization_id, etc. because we can use this table for other purposes as well
 * -------------------------------------------------------------------------------------------------------------------------------------------------------
 * id | contact_id | invoice_id | line_item_id | account_slug | account_id | debit | credit  | organization_id | created_at | updated_at | status | sync_status
 * -------------------------------------------------------------------------------------------------------------------------------------------------------
 * 1  | 1          | 1          | 1            | discount     | 1          | 0     | 100     | 1               | 2021-01-01 | 2021-01-01 | active | synced
 * 2  | 1          | 1          | 1            | tax          | 2          | 0     | 10      | 1               | 2021-01-01 | 2021-01-01 | active | synced
 * 3  | 1          | 1          | 1            | sales        | 3          | 110   | 0       | 1               | 2021-01-01 | 2021-01-01 | active | synced
 * -------------------------------------------------------------------------------------------------------------------------------------------------------
 * here  account_slug is required for future reference and account_id is required for the accounting system.
 * if any invoice is touched, we make the "sync_status" to unsliced and then sync it again.
 */

@Table({
  underscored: true,
  tableName: "InvoiceJournals",
})
class InvoiceJournalModel extends Model<
  InferAttributes<InvoiceJournalModel>,
  InferCreationAttributes<InvoiceJournalModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare contactId: number;
  @BelongsTo(() => Contacts, "contactId")
  declare Contact?: NonAttribute<Contacts>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare invoiceId: number;
  @BelongsTo(() => Invoice, "invoiceId")
  declare Invoice?: NonAttribute<Invoice>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare lineItemId: number;
  @BelongsTo(() => InvoiceLineItem, "lineItemId")
  declare LineItem?: NonAttribute<InvoiceLineItem>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare accountSlug: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountId: number;
  @BelongsTo(() => AccountsOfOrganization, "accountId")
  declare Account?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.DECIMAL(10, 2))
  @NotNull
  declare debitBcy: number;

  @Attribute(DataTypes.DECIMAL(10, 2))
  @NotNull
  declare creditBcy: number;

  @Attribute(DataTypes.DECIMAL(10, 2))
  @NotNull
  declare debitFcy: number;

  @Attribute(DataTypes.DECIMAL(10, 2))
  @NotNull
  declare creditFcy: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  declare status: "active" | "deleted";

  @Attribute(DataTypes.ENUM("synced", "notSynced"))
  @Default("synced")
  declare syncStatus: "synced" | "notSynced";
}

type InvoiceJournalCreatable = InferCreationAttributes<InvoiceJournalModel>;
export { InvoiceJournalModel };
export type { InvoiceJournalCreatable };