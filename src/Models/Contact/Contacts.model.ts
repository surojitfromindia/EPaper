import {
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  CurrencyModel,
  OrganizationBasic,
  PaymentTermModel,
  User,
} from "../index";
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
  declare contactName?: string;

  @Attribute(DataTypes.CITEXT)
  @AllowNull
  declare companyName?: string;

  @Attribute(DataTypes.ENUM("customer", "vendor"))
  @NotNull
  declare contactType: "customer" | "vendor";

  @Attribute(DataTypes.ENUM("business", "individual"))
  declare contactSubType: "business" | "individual";

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare currencyId: number;
  @BelongsTo(() => CurrencyModel, "currencyId")
  declare Currency?: NonAttribute<CurrencyModel>;

  @Attribute(DataTypes.INTEGER)
  declare paymentTermId: number;
  @BelongsTo(() => PaymentTermModel, "paymentTermId")
  declare PaymentTerm?: NonAttribute<PaymentTermModel>;

  @Attribute(DataTypes.STRING)
  @AllowNull
  declare remarks?: string;

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

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @Default("active")
  @NotNull
  declare status: "active" | "deleted";
}

export { Contacts };
type ContactType = Attributes<Contacts> & {
  Currency?: NonAttribute<CurrencyModel>;
};
type ContactIdType = number;

export type { ContactType, ContactIdType };
