import {
  Attributes,
  CreationAttributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  Contacts,
  CurrencyModel,
  InvoiceLineItem,
  InvoicePaymentTerm,
  OrganizationBasic,
  User,
} from "../index";
import { MathLib } from "../../Utils/MathLib/mathLib";
import {
  MAXIMUM_EXCHANGE_RATE_PRECISION,
  MAXIMUM_NUMERIC_PRECISION,
} from "../../Constants/General.Constant";
import {
  AllowNull,
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { DateUtil } from "../../Utils/DateUtil";

@Table({
  underscored: true,
  tableName: "Invoices",
  indexes: [
    {
      type: "unique",
      name: "organization_invoice_number_unique",
      fields: ["organization_id", "invoice_number"],
    },
  ],
})
class Invoice extends Model<
  InferAttributes<Invoice>,
  InferCreationAttributes<Invoice>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare issueDate: string;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare dueDate: string;

  @Attribute(DataTypes.VIRTUAL(DataTypes.INTEGER, ["dueDate"]))
  get dueDays(): number {
    const today = new Date();
    const dueDate = this.dueDate;
    // positive means not due yet
    // negative means due
    return DateUtil.daysBetween(today, DateUtil.parseFromStr(dueDate));
  }

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare contactId: number;
  @BelongsTo(() => Contacts, "contactId")
  declare Contact?: NonAttribute<Contacts>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare currencyId: number;
  @BelongsTo(() => CurrencyModel, "currencyId")
  declare Currency?: NonAttribute<CurrencyModel>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare invoiceNumber: string;

  @Attribute(DataTypes.STRING)
  declare referenceNumber: string;

  @Attribute(DataTypes.STRING)
  declare orderNumber: string;

  @Attribute(DataTypes.STRING)
  declare terms: string;

  @Attribute(DataTypes.STRING)
  declare notes: string;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isInclusiveTax: boolean;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;
  @BelongsTo(() => User, "createdBy")
  declare CreatedBy?: NonAttribute<User>;

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get discountTotal(): number {
    const value = this.getDataValue("discountTotal");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get taxTotal(): number {
    const value = this.getDataValue("taxTotal");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get subTotal(): number {
    const value = this.getDataValue("subTotal");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get total(): number {
    const value = this.getDataValue("total");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  // bcy rate
  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyDiscountTotal(): number {
    const value = this.getDataValue("bcyDiscountTotal");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyTaxTotal(): number {
    const value = this.getDataValue("bcyTaxTotal");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcySubTotal(): number {
    const value = this.getDataValue("bcySubTotal");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyTotal(): number {
    const value = this.getDataValue("bcyTotal");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }
  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get balance(): number {
    const value = this.getDataValue("balance");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyBalance(): number {
    const value = this.getDataValue("bcyBalance");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @HasMany(() => InvoiceLineItem, "invoiceId")
  declare LineItems: NonAttribute<InvoiceLineItem[]>;

  @Attribute(DataTypes.INTEGER)
  @AllowNull
  declare invoicePaymentTermId: number;
  @BelongsTo(() => InvoicePaymentTerm, "invoicePaymentTermId")
  declare InvoicePaymentTerm?: NonAttribute<InvoicePaymentTerm>;

  @Attribute(DataTypes.ENUM("sent", "draft", "void"))
  @NotNull
  declare transactionStatus: "sent" | "draft" | "void";

  @Attribute(DataTypes.ENUM("paid", "not_paid", "partially_paid"))
  @NotNull
  declare paymentStatus: "paid" | "not_paid" | "partially_paid";

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  @Default("active")
  declare status: "active" | "deleted";

  @Attribute(DataTypes.ENUM("synced", "notSynced"))
  @NotNull
  @Default("synced")
  declare syncStatus: "synced" | "notSynced";

  @Attribute(DataTypes.DECIMAL(10, MAXIMUM_EXCHANGE_RATE_PRECISION))
  @NotNull
  @Default(1)
  get exchangeRate(): number {
    const value = this.getDataValue("exchangeRate");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_EXCHANGE_RATE_PRECISION, value);
    }
    return value;
  }
}

type InvoiceCreatable = CreationAttributes<Invoice>;
type InvoiceCreatableBasic = Omit<
  InvoiceCreatable,
  | "organizationId"
  | "createdBy"
  | "total"
  | "subTotal"
  | "discountTotal"
  | "taxTotal"
  | "status"
>;
type InvoiceType = Attributes<Invoice> & {
  LineItems?: InvoiceLineItem[];
  InvoicePaymentTerm?: InvoicePaymentTerm;
  Contact?: Contacts;
  Currency?: CurrencyModel;
};
type InvoiceIdType = number;

const InvoiceColumnNamesRaw = {
  id: "id",
  issueDate: "issue_date",
  dueDate: "due_date",
  contactId: "contact_id",
  currencyId: "currency_id",
  invoiceNumber: "invoice_number",
  referenceNumber: "reference_number",
  orderNumber: "order_number",
  terms: "terms",
  notes: "notes",
  isInclusiveTax: "is_inclusive_tax",
  transactionStatus: "transaction_status",
  organizationId: "organization_id",
  createdBy: "created_by",
  discountTotal: "discount_total",
  taxTotal: "tax_total",
  subTotal: "sub_total",
  total: "total",
  bcyDiscountTotal: "bcy_discount_total",
  bcyTaxTotal: "bcy_tax_total",
  bcySubTotal: "bcy_sub_total",
  bcyTotal: "bcy_total",
  invoicePaymentTermId: "invoice_payment_term_id",
  status: "status",
  syncStatus: "sync_status",
  exchangeRate: "exchange_rate",
  balance: "balance",
  bcyBalance: "bcy_balance",
  paymentStatus: "payment_status",
};
const InvoiceTableName = "Invoices";

export { Invoice, InvoiceColumnNamesRaw, InvoiceTableName };
export type {
  InvoiceIdType,
  InvoiceCreatable,
  InvoiceType,
  InvoiceCreatableBasic,
};
