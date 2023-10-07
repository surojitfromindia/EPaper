import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  AccountGroups,
  AccountTemplateDetails,
  AccountTypes,
  OrganizationBasic,
  User,
} from "../index";
import { AccountsOfTemplate } from "./AccountsOfTemplate.model";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class AccountsOfOrganization extends Model {}
//
// AccountsOfOrganization.init(
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
//       type: DataTypes.ENUM("active", "inactive", "deleted"),
//       allowNull: false,
//       columnName: "status",
//       defaultValue: "active",
//     },
//     depth: {
//       type: DataTypes.TINYINT,
//       allowNull: true,
//       columnName: "depth",
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       columnName: "description",
//     },
//   },
//   {
//     sequelize,
//   },
// );
//
// AccountsOfOrganization.belongsTo(AccountsOfOrganization, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "account_parent_id",
//     name: "accountParentId",
//   },
//   as: "AccountParent",
// });
// AccountsOfOrganization.belongsTo(AccountGroups, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "account_group_id",
//     name: "accountGroupId",
//   },
//   as: "AccountGroup",
// });
// AccountsOfOrganization.belongsTo(AccountTypes, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "account_type_id",
//     name: "accountTypeId",
//   },
//   as: "AccountType",
// });
// AccountsOfOrganization.belongsTo(AccountTemplateDetails, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "account_template_id",
//     name: "accountTemplateId",
//   },
//   as: "AccountTemplate",
// });
// AccountsOfOrganization.belongsTo(User, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "created_by",
//     name: "createdBy",
//   },
//   as: "createdByUser",
// });
// AccountsOfOrganization.belongsTo(OrganizationBasic, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "organization_id",
//     name: "organizationId",
//   },
//   as: "organization",
// });
//
// // account information from a template account.
// AccountsOfOrganization.belongsTo(AccountsOfTemplate, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "origin_account_id",
//     name: "originAccountId",
//   },
//   as: "originAccount",
// });
// AccountsOfOrganization.belongsTo(AccountsOfTemplate, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "origin_account_parent_id",
//     name: "originAccountParentId",
//   },
//   as: "originAccountParent",
// });

@Table({
  underscored: true,
  tableName: "AccountsOfOrganization",
})
class AccountsOfOrganization extends Model<
  InferAttributes<AccountsOfOrganization>,
  InferCreationAttributes<AccountsOfOrganization>
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
  declare description: string;

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
  @BelongsTo(() => AccountsOfOrganization, "accountParentId")
  declare AccountParent?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  declare originAccountId: number;
  @BelongsTo(() => AccountsOfTemplate, "originAccountId")
  declare OriginAccount?: NonAttribute<AccountsOfTemplate>;

  @Attribute(DataTypes.INTEGER)
  declare originAccountParentId: number;
  @BelongsTo(() => AccountsOfTemplate, "originAccountParentId")
  declare OriginAccountParent?: NonAttribute<AccountsOfTemplate>;

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
export { AccountsOfOrganization };
