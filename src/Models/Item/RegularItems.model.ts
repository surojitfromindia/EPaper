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
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class RegularItems extends Model {}
//
// RegularItems.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       columnName: "id",
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "name",
//     },
//     productType: {
//       type: DataTypes.ENUM("service", "goods"),
//       allowNull: false,
//       columnName: "product_type",
//     },
//     sellingPrice: {
//       type: DataTypes.DECIMAL,
//       allowNull: true,
//       columnName: "selling_price",
//       get() {
//         const value = this.getDataValue("sellingPrice");
//         if (value) {
//           return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
//         }
//         return value;
//       },
//     },
//     sellingDescription: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       columnName: "selling_description",
//     },
//     purchasePrice: {
//       type: DataTypes.DECIMAL,
//       allowNull: true,
//       columnName: "purchase_price",
//       get() {
//         const value = this.getDataValue("purchasePrice");
//         if (value) {
//           return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
//         }
//         return value;
//       },
//     },
//     purchaseDescription: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       columnName: "purchase_description",
//     },
//     itemFor: {
//       type: DataTypes.ENUM("sales", "purchase", "sales_and_purchase"),
//       allowNull: false,
//       columnName: "item_for",
//     },
//
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "status",
//       defaultValue: "active",
//     },
//   },
//   {
//     sequelize,
//   },
// );
//
// RegularItems.belongsTo(User, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "created_by",
//     name: "createdBy",
//   },
//   as: "CreatedByUser",
// });
// RegularItems.belongsTo(OrganizationBasic, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "organization_id",
//     name: "organizationId",
//   },
//   as: "Organization",
// });
// RegularItems.belongsTo(AccountsOfOrganization, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "sales_account_id",
//     name: "salesAccountId",
//   },
//   as: "SalesAccount",
// });
// RegularItems.belongsTo(AccountsOfOrganization, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "purchase_account_id",
//     name: "purchaseAccountId",
//   },
//   as: "PurchaseAccount",
// });
// RegularItems.belongsTo(TaxRates, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "tax_id",
//     name: "taxId",
//   },
//   as: "Tax",
// });
// RegularItems.belongsTo(ItemUnit, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "unit_id",
//     name: "unitId",
//   },
//   as: "Unit",
// });

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
  declare status: "active" | "deactive";

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;
  @BelongsTo(() => User, "userId")
  declare User?: NonAttribute<User>;
}
export { RegularItems };
