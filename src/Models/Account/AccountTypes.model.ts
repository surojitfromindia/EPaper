import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { AccountGroups } from "./AccountGroups.model";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class AccountTypes extends Model {}
//
// AccountTypes.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       columnName: "id",
//       allowNull: false,
//     },
//     name: {
//       unique: true,
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "name",
//     },
//     code: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "code",
//     },
//     nameFormatted: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "name_formatted",
//     },
//   },
//   {
//     sequelize,
//   },
// );
//
// AccountTypes.belongsTo(AccountGroups, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "account_group_id",
//     name: "accountGroupId",
//   },
//   as: "AccountGroup",
// });

@Table({
  underscored: true,
  tableName: "AccountTypes",
})
class AccountTypes extends Model<
  InferAttributes<AccountTypes>,
  InferCreationAttributes<AccountTypes>
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
  declare nameFormatted: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare code: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountGroupId: number;

  @BelongsTo(() => AccountGroups, "accountGroupId")
  declare AccountGroup?: NonAttribute<AccountGroups>;
}
export { AccountTypes };
