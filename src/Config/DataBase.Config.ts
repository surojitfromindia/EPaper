import { Sequelize } from "@sequelize/core";
import {
  AccountGroups,
  AccountsConfig,
  AccountsOfOrganization,
  AccountsOfTemplate,
  AccountTemplateDetails,
  AccountTypes,
  Contacts,
  CurrencyExchangeRate,
  CurrencyModel,
  GeneralPreferenceModel,
  Invoice,
  InvoiceLineItem,
  InvoicePaymentTerm,
  ItemPreference,
  ItemUnit,
  OrganizationBasic,
  OrganizationsUsers,
  PaymentTerms,
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
    GeneralPreferenceModel,
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
    PaymentTerms,
    InvoicePaymentTerm,
    CurrencyModel,
    CurrencyExchangeRate,
  ],
});

async function syncModel() {
  const alter = true;
  const force = false;
  // await Currency.sync({ alter, force });
  // await CurrencyExchangeRate.sync({ alter, force });
  await Invoice.sync({ alter, force });
  await InvoiceLineItem.sync({ alter, force });
}

syncModel().catch((err) => console.log(err));

export default sequelize;
