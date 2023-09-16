import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import { AccountGroups } from "./AccountGroups.model.js";

class AccountTypes extends Model {}

AccountTypes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
    },
    name: {
      unique: true,
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

AccountTypes.belongsTo(AccountGroups, {
  foreignKey: {
    allowNull: false,
    columnName: "account_group_id",
    name: "accountGroupId",
  },
  as: "AccountGroup",
});

export { AccountTypes };
