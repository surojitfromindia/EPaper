// store config of accounts along with account template id and organization.

import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/DataBase.Config.js";
import { AccountTemplateDetails } from "./AccountTemplateDetails.model.js";

class AccountsConfig extends Model {}

AccountsConfig.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
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

AccountsConfig.belongsTo(AccountTemplateDetails, {
  foreignKey: {
    allowNull: false,
    columnName: "account_template_id",
    name: "accountTemplateId",
  },
  as: "AccountTemplate",
});
export { AccountsConfig };
