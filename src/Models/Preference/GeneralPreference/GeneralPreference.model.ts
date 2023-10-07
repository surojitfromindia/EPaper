import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic } from "../../index";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
//
// class GeneralPreference extends Model {}
//
// GeneralPreference.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       columnName: "id",
//       allowNull: false,
//     },
//     salesTaxType: {
//       type: DataTypes.ENUM("inclusive", "exclusive", "entity_level"),
//       allowNull: false,
//       default: "entity_level",
//       columnName: "sales_tax_type",
//     },
//     taxRoundingType: {
//       type: DataTypes.ENUM("item_level", "entity_level"),
//       allowNull: false,
//       default: "item_level",
//       columnName: "tax_rounding_type",
//     },
//     discountType: {
//       type: DataTypes.ENUM("item_level", "entity_level", "no_discount"),
//       allowNull: false,
//       default: "no_discount",
//       columnName: "discountType",
//     },
//     isDiscountBeforeTax: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//       columnName: "is_discount_before_tax",
//     },
//   },
//   {
//     sequelize,
//   },
// );

// GeneralPreference.belongsTo(OrganizationBasic, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "organization_id",
//     name: "organizationId",
//   },
//   as: "organization",
// });

@Table({
  underscored: true,
  tableName: "GeneralPreferences",
})
class GeneralPreference extends Model<
  InferAttributes<GeneralPreference>,
  InferCreationAttributes<GeneralPreference>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.ENUM("inclusive", "exclusive", "entity_level"))
  @NotNull()
  declare salesTaxType: "inclusive" | "exclusive" | "entity_level";

  @Attribute(DataTypes.ENUM("item_level", "entity_level"))
  @NotNull()
  declare taxRoundingType: "item_level" | "entity_level";

  @Attribute(DataTypes.ENUM("item_level", "entity_level", "no_discount"))
  @NotNull()
  declare discountType: "item_level" | "entity_level" | "no_discount";

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isDiscountBeforeTax: boolean;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization: NonAttribute<OrganizationBasic>;
}
export { GeneralPreference };
