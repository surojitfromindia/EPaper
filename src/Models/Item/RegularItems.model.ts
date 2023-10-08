import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic, TaxRates, User } from "../index";
import { AccountsOfOrganization } from "../Account/AccountsOfOrganization.model";
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
  tableName: "RegularItems",
})
class RegularItems extends Model<
  InferAttributes<RegularItems>,
  InferCreationAttributes<RegularItems>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.ENUM("service", "goods"))
  @NotNull
  declare productType: "service" | "goods";

  @Attribute(DataTypes.ENUM("sales", "purchase", "sales_and_purchase"))
  @NotNull
  declare itemFor: "sales" | "purchase" | "sales_and_purchase";

  @Attribute(DataTypes.STRING)
  declare sellingDescription: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare sellingPrice: number;

  @Attribute(DataTypes.INTEGER)
  declare salesAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "salesAccountId")
  declare SalesAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.STRING)
  declare purchaseDescription: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare purchasePrice: number;

  @Attribute(DataTypes.INTEGER)
  declare purchaseAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "purchaseAccountId")
  declare PurchaseAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare taxId: number;
  @BelongsTo(() => TaxRates, "taxId")
  declare Tax?: NonAttribute<TaxRates>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare unitId: number;
  @BelongsTo(() => ItemUnit, "unitId")
  declare Unit?: NonAttribute<ItemUnit>;

  @Attribute(DataTypes.ENUM("active", "deactive"))
  @NotNull
  @Default("active")
  declare status: "active" | "deactive";

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
}
export { RegularItems };
