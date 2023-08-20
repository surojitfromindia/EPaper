import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import { OrganizationBasic, User } from "../index.js";

class TaxRates extends Model {}

TaxRates.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "description",
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "rate",
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "country_code",
    },
    taxType: {
      type: DataTypes.ENUM(["direct_tax"]),
      allowNull: false,
      columnName: "tax_type",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "status",
      defaultValue: "active",
    },
  },
  {
    sequelize,
    indexes: [
      {
        type: "unique",
        fields: ["organization_id", "rate"],
      },
    ],
  },
);

TaxRates.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    columnName: "created_by",
    name: "createdBy",
  },
  as: "createdByUser",
});
TaxRates.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "organization",
});

export { TaxRates };
