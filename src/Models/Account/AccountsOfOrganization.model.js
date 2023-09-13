import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import {
  AccountGroups,
  AccountTemplateDetails,
  AccountTypes,
  OrganizationBasic,
  User,
} from "../index.js";
import { AccountsOfTemplate } from "./AccountsOfTemplate.model.js";

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
AccountsOfOrganization.belongsTo(AccountGroups, {
  foreignKey: {
    allowNull: false,
    columnName: "account_group_id",
    name: "accountGroupId",
  },
  as: "AccountGroup",
});
AccountsOfOrganization.belongsTo(AccountTypes, {
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

// account information from a template account.
AccountsOfOrganization.belongsTo(AccountsOfTemplate, {
  foreignKey: {
    allowNull: true,
    columnName: "origin_account_id",
    name: "originAccountId",
  },
  as: "originAccount",
});
AccountsOfOrganization.belongsTo(AccountsOfTemplate, {
  foreignKey: {
    allowNull: true,
    columnName: "origin_account_parent_id",
    name: "originAccountParentId",
  },
  as: "originAccountParent",
});

export { AccountsOfOrganization };
