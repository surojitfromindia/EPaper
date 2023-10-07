import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config";
import { Contacts, OrganizationBasic, User } from "../index";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { MAXIMUM_NUMERIC_PRECISION } from "../../Constants/General.Constant";

class Invoice extends Model {}

Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "invoice_number",
    },
    referenceNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "reference_number",
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "order_number",
    },
    terms: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "terms",
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "notes",
    },
    status: {
      type: DataTypes.ENUM("active"),
      allowNull: false,
      columnName: "status",
      defaultValue: "active",
    },
    discountTotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "discount_total",
      get() {
        const value = this.getDataValue("discountTotal");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    taxTotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "tax_total",
      get() {
        const value = this.getDataValue("taxTotal");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    subTotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "sub_total",
      get() {
        const value = this.getDataValue("subTotal");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      columnName: "total",
      get() {
        const value = this.getDataValue("total");
        if (value) {
          return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
        }
        return value;
      },
    },
    isInclusiveTax: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      columnName: "is_inclusive_tax",
    },
  },
  {
    sequelize,
  },
);

Invoice.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    columnName: "created_by",
    name: "createdBy",
  },
  as: "CreatedByUser",
});
Invoice.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "Organization",
});
Invoice.belongsTo(Contacts, {
  foreignKey: {
    allowNull: false,
    columnName: "customer_id",
    name: "customerId",
  },
  as: "Customer",
});

export { Invoice };
