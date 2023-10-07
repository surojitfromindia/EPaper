import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic } from "../index";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class ItemPreference extends Model {}
//
// ItemPreference.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       columnName: "id",
//       allowNull: false,
//     },
//     quantityPrecision: {
//       type: DataTypes.TINYINT,
//       allowNull: false,
//       columnName: "quantity_precision",
//     },
//     isItemNameDuplicationEnabled: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       columnName: "is_item_name_duplication_enabled",
//     },
//   },
//   {
//     sequelize,
//   },
// );

// ItemPreference.belongsTo(OrganizationBasic, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "organization_id",
//     name: "organizationId",
//   },
//   as: "organization",
// });

@Table({
  underscored: true,
  tableName: "ItemPreferences",
})
class ItemPreference extends Model<
  InferAttributes<ItemPreference>,
  InferCreationAttributes<ItemPreference>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.TINYINT)
  @NotNull
  declare quantityPrecision: number;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isItemNameDuplicationEnabled: boolean;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization: NonAttribute<OrganizationBasic>;
}

export { ItemPreference };
