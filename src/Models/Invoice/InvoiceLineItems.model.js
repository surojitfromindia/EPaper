import { DataTypes, Model } from "@sequelize/core";
import { OrganizationBasic } from "../Organization/Organization.model.js";
import { Invoice } from "./Invoices.model.js";
import { MathLib } from "../../Utils/MathLib/mathLib.js";
import { MAXIMUM_NUMERIC_PRECISION } from "../../Constants/General.Constant.js";
import { AccountsOfOrganization } from "../Account/AccountsOfOrganization.model.js";
import { TaxRates } from "../Tax/TaxRates.model.js";
import { RegularItems } from "../Item/RegularItems.model.js";
import sequelize from "../../Config/DataBase.Config.js";

class InvoiceLineItem extends Model {}

InvoiceLineItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "item_name",
    },
    itemDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "item_description",
    },

    // discount
    discountFlat: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      columnName: "discount_flat",
      get() {
        const value = this.getDataValue("discountFlat");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    discountPercentage: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      columnName: "discount_percentage",
      get() {
        const value = this.getDataValue("discountPercentage");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    discountAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "discount_amount",
      get() {
        const value = this.getDataValue("discountAmount");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },

    // item quantity
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "quantity",
      get() {
        const value = this.getDataValue("quantity");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },

    // item rate
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "rate",
      get() {
        const value = this.getDataValue("rate");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    rateBcy: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "rate",
      get() {
        const value = this.getDataValue("rateBcy");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },

    // item tax
    taxPercentage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "tax_percentage",
      get() {
        const value = this.getDataValue("tax_percentage");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    taxAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "tax_amount",
      get() {
        const value = this.getDataValue("tax_amount");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },

    itemTotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "item_total",
      get() {
        const value = this.getDataValue("itemTotal");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    itemTotalTaxIncluded: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "item_total_tax_included",
      get() {
        const value = this.getDataValue("itemTotalTaxIncluded");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
  },
  {
    sequelize,
  },
);

InvoiceLineItem.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "Organization",
});
InvoiceLineItem.belongsTo(Invoice, {
  foreignKey: {
    allowNull: false,
    columnName: "invoice_id",
    name: "invoiceId",
  },
  as: "invoice",
});
Invoice.hasMany(InvoiceLineItem, {
  as: "lineItems",
  foreignKey: { name: "invoiceId", columnName: "invoice_id", allowNull: false },
});
InvoiceLineItem.belongsTo(RegularItems, {
  foreignKey: {
    allowNull: true,
    columnName: "item_id",
    name: "itemId",
  },
  as: "item",
});
InvoiceLineItem.belongsTo(AccountsOfOrganization, {
  foreignKey: {
    allowNull: false,
    columnName: "account_id",
    name: "accountId",
  },
  as: "Account",
});
InvoiceLineItem.belongsTo(TaxRates, {
  foreignKey: {
    allowNull: true,
    columnName: "tax_id",
    name: "taxId",
  },
  as: "Tax",
});

export { InvoiceLineItem };
