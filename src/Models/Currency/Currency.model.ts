import {
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic, User } from "../index";
import {
  AllowNull,
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
  tableName: "Currency",
  createdAt: false,
  updatedAt: false,
})
class Currency extends Model<
  InferAttributes<Currency>,
  InferCreationAttributes<Currency>
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
}

export { Currency };
type CurrencyType = Attributes<Currency>;

export type { CurrencyType };
