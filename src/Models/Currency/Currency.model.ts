import {
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { CurrencyExchangeRate, OrganizationBasic, User } from "../index";
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
  tableName: "Currency",
  createdAt: false,
  updatedAt: false,
})
class CurrencyModel extends Model<
  InferAttributes<CurrencyModel>,
  InferCreationAttributes<CurrencyModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.CITEXT)
  @AllowNull
  declare currencyName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare currencySymbol: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare currencyCode: string;

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @Default("active")
  @NotNull
  declare status: "active" | "deleted";

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

  @HasMany(() => CurrencyExchangeRate, "currencyId")
  declare exchangeRates?: NonAttribute<CurrencyExchangeRate[]>;
}

export { CurrencyModel };
type CurrencyType = Attributes<CurrencyModel>;

export type { CurrencyType };
