import { User } from "./User/User.model.js";
import { OrganizationBasic } from "./Organization/Organization.model.js";
import { ItemPreference } from "./Preference/ItemPreference.model.js";
import { AccountTemplateDetails } from "./Account/AccountTemplateDetails.model.js";
import { AccountsOfTemplate } from "./Account/AccountsOfTemplate.model.js";
import { AccountsConfig } from "./Account/AccountsConfig.model.js";
import { OrganizationsUsers } from "./OrganizationsUsers.model.js";
import { TaxRates } from "./Tax/TaxRates.model.js";
import { RegularItems } from "./Item/RegularItems.model.js";
import { AccountsOfOrganization } from "./Account/AccountsOfOrganization.model.js";
import { AccountGroups } from "./Account/AccountGroups.model.js";
import { AccountTypes } from "./Account/AccountTypes.model.js";

const force = false;
const alter = true;

async function syncWithDb() {
  // await User.sync({ alter, force: false });
  // await OrganizationBasic.sync({ alter, force });
  // await AccountGroups.sync({ alter, force });
  // await AccountTypes.sync({ alter, force });
  // await AccountTemplateDetails.sync({ alter, force });
  // await AccountsOfTemplate.sync({ alter, force });
  // await AccountsConfig.sync({ alter, force });
  // await OrganizationsUsers.sync({ alter, force });
  await TaxRates.sync({ alter, force });
  // await RegularItems.sync({ alter, force });
  // await AccountsOfOrganization.sync({ alter });
  // await ItemPreference.sync({ alter });
}

// syncWithDb();
export {
  User,
  OrganizationBasic,
  OrganizationsUsers,
  AccountGroups,
  AccountTypes,
  AccountTemplateDetails,
  AccountsOfTemplate,
  AccountsConfig,
  TaxRates,
  RegularItems,
  AccountsOfOrganization,
  ItemPreference,
};
