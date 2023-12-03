import {
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { Currency, OrganizationBasic, User } from "../index";
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
  tableName: "CurrencyExchangeRate",
  createdAt: false,
  updatedAt: false,
})
class CurrencyExchangeRate extends Model<
  InferAttributes<CurrencyExchangeRate>,
  InferCreationAttributes<CurrencyExchangeRate>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare effectiveDate: string;

  @Attribute(DataTypes.REAL)
  @NotNull
  declare rate: number;

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @Default("active")
  @NotNull
  declare status: "active" | "deleted";

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare currencyId: number;
  @BelongsTo(() => Currency, "currencyId")
  declare Currency?: NonAttribute<Currency>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;
  @BelongsTo(() => User, "createdBy")
  declare CreatedBy?: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;
}

export { CurrencyExchangeRate };
type CurrencyExchangeRateType = Attributes<CurrencyExchangeRate>;

export type { CurrencyExchangeRateType };
