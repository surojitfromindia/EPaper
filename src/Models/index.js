import { User } from "./User/User.model.js";
import { OrganizationBasic } from "./Organization/Organization.model.js";
import { AccountTemplateDetails } from "./Account/AccountTemplateDetails.model.js";
import { AccountsOfTemplate } from "./Account/AccountsOfTemplate.model.js";
import { AccountsConfig } from "./Account/AccountsConfig.model.js";
import { OrganizationsUsers } from "./OrganizationsUsers.model.js";
import { TaxRates } from "./Tax/TaxRates.model.js";
import { RegularItems } from "./Item/RegularItems.model.js";
import { AccountsOfOrganization } from "./Account/AccountsOfOrganization.model.js";

const force = false;
const alter = false;

async function syncWithDb() {
  await User.sync({ alter, force: false });
  await OrganizationBasic.sync({ alter, force });
  await AccountTemplateDetails.sync({ alter, force });
  await AccountsOfTemplate.sync({ alter, force });
  await AccountsConfig.sync({ alter, force });
  // await OrganizationsUsers.sync({ alter: false, force: true });
  await TaxRates.sync({ alter, force });
  await RegularItems.sync({ alter, force });
  await AccountsOfOrganization.sync({ alter: false, force: false });
}

syncWithDb();
export {
  User,
  OrganizationBasic,
  OrganizationsUsers,
  AccountTemplateDetails,
  AccountsOfTemplate,
  AccountsConfig,
  TaxRates,
  RegularItems,
  AccountsOfOrganization,
};
