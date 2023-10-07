import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { AccountTemplateDetails, OrganizationBasic, User } from "../index";
import { AccountGroups } from "./AccountGroups.model";
import { AccountTypes } from "./AccountTypes.model";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class AccountsOfTemplate extends Model {}
//
// AccountsOfTemplate.init(
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
//     code: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "code",
//     },
//     parentCode: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       columnName: "parent_code",
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "status",
//       defaultValue: "active",
//     },
//     depth: {
//       type: DataTypes.TINYINT,
//       allowNull: true,
//       columnName: "depth",
//     },
//   },
//   {
//     sequelize,
//   },
// );
//
// AccountsOfTemplate.belongsTo(AccountsOfTemplate, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "account_parent_id",
//     name: "accountParentId",
//   },
//   as: "AccountParent",
// });
// AccountsOfTemplate.belongsTo(AccountGroups, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "account_group_id",
//     name: "accountGroupId",
//   },
//   as: "AccountGroup",
// });
// AccountsOfTemplate.belongsTo(AccountTypes, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "account_type_id",
//     name: "accountTypeId",
//   },
//   as: "AccountType",
// });
// AccountsOfTemplate.belongsTo(AccountTemplateDetails, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "account_template_id",
//     name: "accountTemplateId",
//   },
//   as: "AccountTemplate",
// });
// AccountsOfTemplate.belongsTo(User, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "created_by",
//     name: "createdBy",
//   },
//   as: "createdByUser",
// });

@Table({
  underscored: true,
  tableName: "AccountsOfTemplate",
})
class AccountsOfTemplate extends Model<
  InferAttributes<AccountsOfTemplate>,
  InferCreationAttributes<AccountsOfTemplate>
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
  declare code: string;

  @Attribute(DataTypes.STRING)
  declare parentCode: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare depth: number;

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
  declare accountParentId: number;
  @BelongsTo(() => AccountsOfTemplate, "accountParentId")
  declare AccountParent?: NonAttribute<AccountsOfTemplate>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountGroupId: number;
  @BelongsTo(() => AccountGroups, "accountGroupId")
  declare AccountGroup?: NonAttribute<AccountGroups>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountTypeId: number;
  @BelongsTo(() => AccountTypes, "accountTypeId")
  declare AccountType?: NonAttribute<AccountTypes>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;
  @BelongsTo(() => User, "userId")
  declare User?: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountTemplateId: number;
  @BelongsTo(() => AccountTemplateDetails, "accountTemplateId")
  declare AccountTemplate?: NonAttribute<AccountTemplateDetails>;
}
export { AccountsOfTemplate };
