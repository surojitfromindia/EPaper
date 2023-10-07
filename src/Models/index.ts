import { User } from "./User/User.model";
import { OrganizationBasic } from "./Organization/Organization.model";
import { OrganizationsUsers } from "./OrganizationsUsers.model";
import { TaxRates } from "./Tax/TaxRates.model";
import { GeneralPreference } from "./Preference/GeneralPreference/GeneralPreference.model";
import { ItemPreference } from "./Preference/ItemPreference.model";
import { ItemUnit } from "./ItemUnit/ItemUnit.model";
import { AccountGroups } from "./Account/AccountGroups.model";
import { AccountTypes } from "./Account/AccountTypes.model";
import { AccountTemplateDetails } from "./Account/AccountTemplateDetails.model";
import { AccountsConfig } from "./Account/AccountsConfig.model";
import { AccountsOfTemplate } from "./Account/AccountsOfTemplate.model";
import { AccountsOfOrganization } from "./Account/AccountsOfOrganization.model";
import { RegularItems } from "./Item/RegularItems.model";
//
// import { Contacts } from "./Contact/Contacts.model";

// const force = false;
// const alter = true;

// async function syncWithDb() {
//   // await User.sync({ alter, force: false });
//   // await OrganizationBasic.sync({ alter, force });
//   // await AccountGroups.sync({ alter, force });
//   // await AccountTypes.sync({ alter, force });
//   // await AccountTemplateDetails.sync({ alter, force });
//   // await AccountsOfTemplate.sync({ alter, force });
//   // await AccountsConfig.sync({ alter, force });
//   // await OrganizationsUsers.sync({ alter, force });
//   // await TaxRates.sync({ alter, force });
//   // await RegularItems.sync({ alter });
//   // await AccountsOfOrganization.sync({ alter });
//   // await ItemPreference.sync({ alter });
//   // await ItemUnit.sync({ alter });
//   // await GeneralPreference.sync({ alter });
//   // await Contacts.sync({ alter });
//   // await Invoice.sync({ alter });
//   // await InvoiceLineItem.sync({ alter });
// }

// syncWithDb();
export {
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
  // Contacts,
};
