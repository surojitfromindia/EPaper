import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import { OrganizationBasic, User } from "../index.js";

class ItemUnit extends Model {}

ItemUnit.init(
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
      allowNull: true,
      columnName: "name",
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "unit",
    },
    status: {
      type: DataTypes.ENUM("active", "deleted"),
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
        fields: ["organization_id", "unit"],
      },
    ],
  },
);

ItemUnit.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    columnName: "created_by",
    name: "createdBy",
  },
  as: "createdByUser",
});
ItemUnit.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "organization",
});

export { ItemUnit };
