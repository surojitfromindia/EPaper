import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";

class AccountGroups extends Model {}

AccountGroups.init(
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "code",
    },
    nameFormatted: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "name_formatted",
    },
  },
  {
    sequelize,
  },
);

export { AccountGroups };
