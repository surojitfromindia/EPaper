import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import { OrganizationBasic, User } from "../index.js";

class RegularItems extends Model {}

RegularItems.init(
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
    productType: {
      type: DataTypes.ENUM("service", "goods"),
      allowNull: false,
      columnName: "product_type",
    },
    sellingPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "selling_price",
    },
    sellingDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "selling_description",
    },
    purchasePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "purchase_price",
    },
    purchaseDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "purchase_description",
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
  },
);

RegularItems.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    columnName: "created_by",
    name: "createdBy",
  },
  as: "createdByUser",
});
RegularItems.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "organization",
});

export { RegularItems };
