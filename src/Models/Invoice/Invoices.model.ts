import {
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
  InvoiceLineItem,
  OrganizationBasic,
  RegularItems,
  User,
} from "../index";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { MAXIMUM_NUMERIC_PRECISION } from "../../Constants/General.Constant";
import {
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

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare contactId: number;
  @BelongsTo(() => Contacts, "contactId")
  declare Contact?: NonAttribute<Contacts>;

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
  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  @Default("active")
  declare status: "active" | "deleted";
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

  @HasMany(() => InvoiceLineItem, "invoiceId")
  declare LineItems: NonAttribute<RegularItems[]>;
}

type InvoiceCreatable = CreationAttributes<Invoice>;
type InvoiceIdType = number;

export { Invoice };
export type { InvoiceIdType, InvoiceCreatable };
