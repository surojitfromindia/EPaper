import {
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
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class ItemUnit extends Model {}
//
// ItemUnit.init(
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
//       allowNull: true,
//       columnName: "name",
//     },
//     unit: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "unit",
//     },
//     status: {
//       type: DataTypes.ENUM("active", "deleted"),
//       allowNull: false,
//       columnName: "status",
//       defaultValue: "active",
//     },
//   },
//   {
//     sequelize,
//     indexes: [
//       {
//         type: "unique",
//         fields: ["organization_id", "unit"],
//       },
//     ],
//   },
// );
//
// ItemUnit.belongsTo(User, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "created_by",
//     name: "createdBy",
//   },
//   as: "createdByUser",
// });
// ItemUnit.belongsTo(OrganizationBasic, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "organization_id",
//     name: "organizationId",
//   },
//   as: "organization",
// });

@Table({
  underscored: true,
  tableName: "ItemUnits",
})
class ItemUnit extends Model<
  InferAttributes<ItemUnit>,
  InferCreationAttributes<ItemUnit>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @AllowNull
  declare name?: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare unit: string;

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  declare status: "active" | "deleted";

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @BelongsTo(() => User, "userId")
  declare User?: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;
}

export { ItemUnit };
