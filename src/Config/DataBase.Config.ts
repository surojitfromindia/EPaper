import { Sequelize } from "@sequelize/core";
import {
  AccountGroups,
  AccountsConfig,
  AccountsOfOrganization,
  AccountsOfTemplate,
  AccountTemplateDetails,
  AccountTypes,
  AutoNumberGroupsModel,
  AutoNumbersModel,
  ContactBalancesModel,
  ContactPerson,
  Contacts,
  CurrencyExchangeRate,
  CurrencyModel,
  CustomerPaymentModel,
  FeaturesPreferenceModel,
  GeneralPreferenceModel,
  Invoice,
  InvoiceJournalModel,
  InvoiceLineItem,
  InvoicePaymentModel,
  InvoicePaymentTerm,
  InvoicePreferencesModel,
  ItemPreference,
  ItemUnit,
  OrganizationBasic,
  OrganizationsUsers,
  PaymentModeModel,
  PaymentTermModel,
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
    PaymentTermModel,
    InvoicePaymentTerm,
    CurrencyModel,
    CurrencyExchangeRate,
    ContactPerson,
    AutoNumbersModel,
    AutoNumberGroupsModel,
    FeaturesPreferenceModel,
    InvoicePreferencesModel,
    ContactBalancesModel,
    InvoiceJournalModel,
    PaymentModeModel,
    CustomerPaymentModel,
    InvoicePaymentModel,
  ],
});

async function syncModel() {
  const alter = true;
  const force = false;
  // await Currency.sync({ alter, force });
  // await CurrencyExchangeRate.sync({ alter, force });
  // await InvoiceServices.sync({ alter, force });
  // await InvoiceLineItem.sync({ alter, force });
  // await Contacts.sync({ alter, force });
  // await ContactPerson.sync({ alter, force });
  // await AutoNumberGroupsModel.sync({ alter, force });
  // await AutoNumbersModel.sync({ alter, force });
  // await GeneralPreferenceModel.sync({ alter, force });
  // await FeaturesPreferenceModel.sync({ alter, force });
  // await InvoicePreferencesModel.sync({ alter, force });
  // await ContactBalancesModel.sync({ alter, force });
  // await AccountsOfTemplate.sync({ alter, force });
  // await AccountsOfOrganization.sync({ alter, force });
  // await AccountsConfig.sync({ alter, force });
  // await InvoiceJournalModel.sync({ alter });
  // await PaymentModeModel.sync({ alter, force });
  // await CustomerPaymentModel.sync({ alter, force });
  // await InvoicePaymentModel.sync({ alter, force });
}

syncModel().catch((err) => console.log(err));

sequelize.authenticate().then(() => {
  console.log("Postgres connected successfully");
});
export default sequelize;
