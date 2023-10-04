import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../../Config/DataBase.Config.js";
import { OrganizationBasic } from "../../index.js";

class GeneralPreference extends Model {}

GeneralPreference.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
    },
    salesTaxType: {
      type: DataTypes.ENUM("inclusive", "exclusive", "entity_level"),
      allowNull: false,
      default: "entity_level",
      columnName: "sales_tax_type",
    },
    taxRoundingType: {
      type: DataTypes.ENUM("item_level", "entity_level"),
      allowNull: false,
      default: "item_level",
      columnName: "tax_rounding_type",
    },
    discountType: {
      type: DataTypes.ENUM("item_level", "entity_level", "no_discount"),
      allowNull: false,
      default: "no_discount",
      columnName: "discountType",
    },
    isDiscountBeforeTax: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      columnName: "is_discount_before_tax",
    },
  },
  {
    sequelize,
  },
);

GeneralPreference.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "organization",
});

export { GeneralPreference };
