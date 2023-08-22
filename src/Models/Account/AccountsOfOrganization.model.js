import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import { AccountTemplateDetails, OrganizationBasic, User } from "../index.js";

class AccountsOfOrganization extends Model {}

AccountsOfOrganization.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "name",
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "code",
    },
    parentCode: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "parent_code",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "status",
      defaultValue: "active",
    },
    depth: {
      type: DataTypes.TINYINT,
      allowNull: true,
      columnName: "depth",
    },
    type: {
      type: DataTypes.ENUM(["group", "account_type", "account"]),
      allowNull: false,
      columnName: "account_type",
    },
  },
  {
    sequelize,
  },
);

AccountsOfOrganization.belongsTo(AccountsOfOrganization, {
  foreignKey: {
    allowNull: true,
    columnName: "account_parent_id",
    name: "accountParentId",
  },
  as: "AccountParent",
});
AccountsOfOrganization.belongsTo(AccountsOfOrganization, {
  foreignKey: {
    allowNull: true,
    columnName: "account_group_id",
    name: "accountGroupId",
  },
  as: "AccountGroup",
});
AccountsOfOrganization.belongsTo(AccountsOfOrganization, {
  foreignKey: {
    allowNull: true,
    columnName: "account_type_id",
    name: "accountTypeId",
  },
  as: "AccountType",
});
AccountsOfOrganization.belongsTo(AccountTemplateDetails, {
  foreignKey: {
    allowNull: false,
    columnName: "account_template_id",
    name: "accountTemplateId",
  },
  as: "AccountTemplate",
});
AccountsOfOrganization.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    columnName: "created_by",
    name: "createdBy",
  },
  as: "createdByUser",
});
AccountsOfOrganization.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "organization",
});

await AccountsOfOrganization.sync({
  force: true,
});

export { AccountsOfOrganization };
