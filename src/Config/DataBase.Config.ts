import { Sequelize } from "@sequelize/core";
import {
  AccountGroups,
  AccountsConfig,
  AccountsOfOrganization,
  AccountsOfTemplate,
  AccountTemplateDetails,
  AccountTypes,
  Contacts,
  GeneralPreference,
  Invoice,
  InvoiceLineItem,
  ItemPreference,
  ItemUnit,
  OrganizationBasic,
  OrganizationsUsers,
  RegularItems,
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
    AccountTemplateDetails,
    AccountsConfig,
    AccountsOfTemplate,
    AccountsOfOrganization,
    RegularItems,
    Contacts,
    Invoice,
    InvoiceLineItem,
  ],
});

function syncModel() {
  const alter = true;
  const force = true;
  Invoice.sync({
    alter,
    force,
  }).catch((err) => console.log(err));
  InvoiceLineItem.sync({
    alter,
    force,
  }).catch((err) => console.log(err));
}

syncModel();

export default sequelize;
