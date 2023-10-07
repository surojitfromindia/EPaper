// store config of accounts along with account template id and organization.

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { AccountTemplateDetails } from "./AccountTemplateDetails.model";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class AccountsConfig extends Model {}
//
// AccountsConfig.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       columnName: "id",
//       allowNull: false,
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
// AccountsConfig.belongsTo(AccountTemplateDetails, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "account_template_id",
//     name: "accountTemplateId",
//   },
//   as: "AccountTemplate",
// });

@Table({
  underscored: true,
  tableName: "AccountsConfig",
})
class AccountsConfig extends Model<
  InferAttributes<AccountsConfig>,
  InferCreationAttributes<AccountsConfig>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.ENUM("active", "deactive"))
  @NotNull
  declare status: "active" | "deactive";

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountTemplateId: number;
  @BelongsTo(() => AccountTemplateDetails, "accountTemplateId")
  declare AccountTemplate?: NonAttribute<AccountTemplateDetails>;
}
export { AccountsConfig };
