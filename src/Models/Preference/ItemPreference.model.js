import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import { OrganizationBasic } from "../index.js";

class ItemPreference extends Model {}

ItemPreference.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
    },
    quantityPrecision: {
      type: DataTypes.TINYINT,
      allowNull: false,
      default: 2,
      columnName: "quantity_precision",
    },
    isItemNameDuplicationEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true,
      columnName: "is_item_name_duplication_enabled",
    },
  },
  {
    sequelize,
  },
);

ItemPreference.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "organization",
});

export { ItemPreference };
