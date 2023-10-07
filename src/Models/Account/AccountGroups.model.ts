import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  Attribute,
  AutoIncrement,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class AccountGroups extends Model {}
//
// AccountGroups.init(
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
@Table({
  underscored: true,
  tableName: "AccountGroups",
})
class AccountGroups extends Model<
  InferAttributes<AccountGroups>,
  InferCreationAttributes<AccountGroups>
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
}

export { AccountGroups };
