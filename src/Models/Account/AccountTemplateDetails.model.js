import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import { User } from "../User/User.model.js";
import { OrganizationBasic } from "../Organization/Organization.model.js";

class AccountTemplateDetails extends Model {}

AccountTemplateDetails.init(
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
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "country_code",
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "sector",
    },
    status: {
      type: DataTypes.ENUM("active", "deactive"),
      allowNull: false,
      columnName: "status",
      defaultValue: "active",
    },
    isDefaultTemplate: {
      type: DataTypes.BOOLEAN,
      columnName: "is_default",
      unique: true,
      allowNull: true,
    },
  },
  {
    sequelize,
  },
);

AccountTemplateDetails.belongsTo(AccountTemplateDetails, {
  foreignKey: {
    allowNull: true,
    columnName: "origin_template_id",
    name: "originTemplateId",
  },
  as: "OriginAccountTemplate",
});

AccountTemplateDetails.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    columnName: "created_by",
    name: "createdBy",
  },
  as: "createdByUser",
});

AccountTemplateDetails.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "organization",
});

export { AccountTemplateDetails };
