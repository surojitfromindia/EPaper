import {
  CreationAttributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic } from "../Organization/Organization.model";
import { Invoice } from "./Invoices.model";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { MAXIMUM_NUMERIC_PRECISION } from "../../Constants/General.Constant";
import { AccountsOfOrganization } from "../Account/AccountsOfOrganization.model";
import { TaxRates } from "../Tax/TaxRates.model";
import { RegularItems } from "../Item/RegularItems.model";
import { ItemUnit } from "../ItemUnit/ItemUnit.model";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({
  underscored: true,
  tableName: "InvoiceLineItems",
})
class InvoiceLineItem extends Model<
  InferAttributes<InvoiceLineItem>,
  InferCreationAttributes<InvoiceLineItem>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  declare description: string;

  @Attribute(DataTypes.STRING)
  declare unit: string;
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
  declare invoiceId: number;
  @BelongsTo(() => Invoice, "invoiceId")
  declare Invoice?: NonAttribute<Invoice>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare itemId: number;
  @BelongsTo(() => RegularItems, "itemId")
  declare Item?: NonAttribute<RegularItems>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountId: number;
  @BelongsTo(() => AccountsOfOrganization, "accountId")
  declare Account?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare taxId: number;
  @BelongsTo(() => TaxRates, "taxId")
  declare Tax?: NonAttribute<TaxRates>;

  @Attribute(DataTypes.INTEGER)
  declare unitId: number;
  @BelongsTo(() => ItemUnit, "unitId")
  declare Unit?: NonAttribute<ItemUnit>;

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get rate(): number {
    const value = this.getDataValue("rate");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get quantity(): number {
    const value = this.getDataValue("quantity");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get discountPercentage(): number {
    const value = this.getDataValue("discountPercentage");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get discountAmount(): number {
    const value = this.getDataValue("discountAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get taxPercentage(): number {
    const value = this.getDataValue("taxPercentage");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get taxAmount(): number {
    const value = this.getDataValue("taxAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get itemTotal(): number {
    const value = this.getDataValue("itemTotal");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get itemTotalTaxIncluded(): number {
    const value = this.getDataValue("itemTotalTaxIncluded");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }
}

type InvoiceLineItemCreatable = CreationAttributes<InvoiceLineItem>;
type InvoiceLineItemIdType = number;
export { InvoiceLineItem };
export type { InvoiceLineItemCreatable, InvoiceLineItemIdType };
