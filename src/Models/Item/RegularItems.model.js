import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import { OrganizationBasic, TaxRates, User } from "../index.js";
import { AccountsOfOrganization } from "../Account/AccountsOfOrganization.model.js";
import { MathLib } from "../../Utils/MathLib/mathLib.js";
import { MAXIMUM_NUMERIC_PRECISION } from "../../Constants/General.Constant.js";

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
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "unit",
    },
    productType: {
      type: DataTypes.ENUM("service", "goods"),
      allowNull: false,
      columnName: "product_type",
    },
    sellingPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      columnName: "selling_price",
      get() {
        const value = this.getDataValue("sellingPrice");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    sellingDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "selling_description",
    },
    purchasePrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      columnName: "purchase_price",
      get() {
        const value = this.getDataValue("purchasePrice");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    purchaseDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "purchase_description",
    },
    itemFor: {
      type: DataTypes.ENUM("sales", "purchase", "sales_and_purchase"),
      allowNull: false,
      columnName: "item_for",
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
  as: "CreatedByUser",
});
RegularItems.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "Organization",
});
RegularItems.belongsTo(AccountsOfOrganization, {
  foreignKey: {
    allowNull: true,
    columnName: "sales_account_id",
    name: "salesAccountId",
  },
  as: "SalesAccount",
});
RegularItems.belongsTo(AccountsOfOrganization, {
  foreignKey: {
    allowNull: true,
    columnName: "purchase_account_id",
    name: "purchaseAccountId",
  },
  as: "PurchaseAccount",
});
RegularItems.belongsTo(TaxRates, {
  foreignKey: {
    allowNull: true,
    columnName: "tax_id",
    name: "taxId",
  },
  as: "Tax",
});

export { RegularItems };
