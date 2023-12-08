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
  tableName: "Contacts",
  createdAt: false,
  updatedAt: false,
})
class Contacts extends Model<
  InferAttributes<Contacts>,
  InferCreationAttributes<Contacts>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.CITEXT)
  @AllowNull
  declare contactName?: string;

  @Attribute(DataTypes.ENUM("customer", "vendor"))
  @NotNull
  declare contactType: "customer" | "vendor";

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
  declare currencyId: number;
  @BelongsTo(() => Currency, "currencyId")
  declare Currency?: NonAttribute<Currency>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;
}

export { Contacts };
type ContactType = Attributes<Contacts> & {
  Currency?: NonAttribute<Currency>;
};
type ContactIdType = number;

export type { ContactType, ContactIdType };
