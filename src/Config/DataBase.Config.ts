import { Sequelize } from "@sequelize/core";
import {
  AccountGroups,
  AccountTypes,
  GeneralPreference,
  ItemPreference,
  ItemUnit,
  OrganizationBasic,
  OrganizationsUsers,
  TaxRates,
  User,
} from "../Models";

const dbName = process.env[`API_DB_NAME`];
const userName = process.env[`API_DB_USER`];
const userPassword = process.env[`API_DB_USER_PASSWORD`];
const hostName = process.env[`API_DB_HOST`];
const ssl = process.env[`SSL`] === "true";

const sequelize = new Sequelize(dbName, userName, userPassword, {
  host: hostName,
  dialect: "postgres",
  dialectOptions: {
    ssl,
  },
  logging: (message) => console.log(message, "\n\n"),
  logQueryParameters: true,
  models: [
    User,
    OrganizationBasic,
    OrganizationsUsers,
    TaxRates,
    GeneralPreference,
    ItemPreference,
    ItemUnit,
    AccountGroups,
    AccountTypes,
  ],
});

sequelize
  .sync({
    alter: true,
  })
  .catch((error) => {
    console.log("error :", error);
  });

export default sequelize;
