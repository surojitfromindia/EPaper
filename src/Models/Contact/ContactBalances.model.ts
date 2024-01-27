import {
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { Contacts, CurrencyModel, OrganizationBasic, User } from "../index";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { MAXIMUM_NUMERIC_PRECISION } from "../../Constants/General.Constant";

@Table({
  underscored: true,
  tableName: "ContactBalances",
  createdAt: false,
  updatedAt: false,
})
class ContactBalancesModel extends Model<
  InferAttributes<ContactBalancesModel>,
  InferCreationAttributes<ContactBalancesModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.ENUM("customer", "vendor"))
  @NotNull
  declare contactType: "customer" | "vendor";

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
  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  isDefault: boolean;
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

  // unused credits receivable amount (also bcy)
  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get unusedCreditsReceivableAmount(): number {
    const value = this.getDataValue("unusedCreditsReceivableAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyUnusedCreditsReceivableAmount(): number {
    const value = this.getDataValue("bcyUnusedCreditsReceivableAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  // unused credits payable amount (also bcy)
  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get unusedCreditsPayableAmount(): number {
    const value = this.getDataValue("unusedCreditsPayableAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyUnusedCreditsPayableAmount(): number {
    const value = this.getDataValue("bcyUnusedCreditsPayableAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  // outstanding credits receivable amount (also bcy)
  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get outstandingCreditsReceivableAmount(): number {
    const value = this.getDataValue("outstandingCreditsReceivableAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyOutstandingCreditsReceivableAmount(): number {
    const value = this.getDataValue("bcyOutstandingCreditsReceivableAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  // outstanding credits payable amount (also bcy)
  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get outstandingCreditsPayableAmount(): number {
    const value = this.getDataValue("outstandingCreditsPayableAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyOutstandingCreditsPayableAmount(): number {
    const value = this.getDataValue("bcyOutstandingCreditsPayableAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }
}

export { ContactBalancesModel };
type ContactBalancesModelType = Attributes<ContactBalancesModel> & {
  Currency?: NonAttribute<CurrencyModel>;
};

export type { ContactBalancesModelType };
