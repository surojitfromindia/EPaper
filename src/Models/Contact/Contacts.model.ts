import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config";
import { OrganizationBasic } from "../index";

class Contacts extends Model {}

Contacts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "contact_name",
    },
    contactType: {
      type: DataTypes.ENUM("customer", "vendor"),
      allowNull: false,
      columnName: "contact_type",
    },
  },
  {
    sequelize,
  },
);

Contacts.belongsTo(OrganizationBasic, {
  foreignKey: {
    allowNull: false,
    columnName: "organization_id",
    name: "organizationId",
  },
  as: "organization",
});

export { Contacts };
