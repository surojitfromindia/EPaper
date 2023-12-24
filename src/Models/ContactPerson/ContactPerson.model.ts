import {
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { Contacts, OrganizationBasic, User } from "../index";
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
  tableName: "ContactPersons",
  createdAt: false,
  updatedAt: false,
})
class ContactPerson extends Model<
  InferAttributes<ContactPerson>,
  InferCreationAttributes<ContactPerson>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  @NotNull
  declare isPrimary: boolean;

  @Attribute(DataTypes.TEXT)
  @AllowNull
  declare salutation?: string;

  @Attribute(DataTypes.CITEXT)
  @AllowNull
  declare firstName?: string;

  @Attribute(DataTypes.CITEXT)
  @AllowNull
  declare lastName?: string;

  @Attribute(DataTypes.CITEXT)
  @AllowNull
  declare email?: string;

  @Attribute(DataTypes.TEXT)
  @AllowNull
  declare phone?: string;

  @Attribute(DataTypes.TEXT)
  @AllowNull
  declare mobile?: string;

  @Attribute(DataTypes.STRING)
  @AllowNull
  declare designation?: string;

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

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare contactId: number;
  @BelongsTo(() => Contacts, "contactId")
  declare Contact?: NonAttribute<Contacts>;

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @Default("active")
  @NotNull
  declare status: "active" | "deleted";
}

export { ContactPerson };
type ContactPersonType = Attributes<ContactPerson> & {};
type ContactPersonIdType = number;

export type { ContactPersonType, ContactPersonIdType };
