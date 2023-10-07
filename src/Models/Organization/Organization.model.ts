import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { User } from "../index";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class OrganizationBasic extends Model {}

// OrganizationBasic.init(
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
//     primaryAddress: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "primary_address",
//     },
//     countryCode: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "country_code",
//     },
//     sector: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "sector",
//     },
//     currencyCode: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "currency_code",
//     },
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
// OrganizationBasic.belongsTo(User, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "created_by",
//     name: "createdBy",
//   },
//   as: "createdByUser",
// });
//

@Table({
  underscored: true,
  tableName: "OrganizationBasic",
})
class OrganizationBasic extends Model<
  InferAttributes<OrganizationBasic>,
  InferCreationAttributes<OrganizationBasic>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare primaryAddress: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare countryCode: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare sector: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare currencyCode: string;

  @Attribute(DataTypes.ENUM("active", "deactive"))
  @NotNull
  @Default("active")
  declare status: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;

  @BelongsTo(() => User, "createdBy")
  declare createdByUser?: NonAttribute<User>;
}

export { OrganizationBasic };
