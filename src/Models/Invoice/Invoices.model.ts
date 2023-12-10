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

  @Attribute(DataTypes.ENUM("sent", "draft", "void"))
  @NotNull
  declare transactionStatus: "sent" | "draft" | "void";

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

  @HasMany(() => InvoiceLineItem, "invoiceId")
  declare LineItems: NonAttribute<InvoiceLineItem[]>;

  @Attribute(DataTypes.INTEGER)
  @AllowNull
  declare invoicePaymentTermId: number;
  @BelongsTo(() => InvoicePaymentTerm, "invoicePaymentTermId")
  declare InvoicePaymentTerm?: NonAttribute<InvoicePaymentTerm>;

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

export { Invoice };
export type {
  InvoiceIdType,
  InvoiceCreatable,
  InvoiceType,
  InvoiceCreatableBasic,
};
