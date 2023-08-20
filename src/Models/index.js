import { User } from "./User/User.model.js";
import { OrganizationBasic } from "./Organization/Organization.model.js";
import { AccountTemplateDetails } from "./Account/AccountTemplateDetails.model.js";
import { AccountsOfTemplate } from "./Account/AccountsOfTemplate.model.js";
import { AccountsConfig } from "./Account/AccountsConfig.model.js";
import { OrganizationsUsers } from "./OrganizationsUsers.model.js";
import { TaxRates } from "./Tax/TaxRates.model.js";
import { RegularItems } from "./Item/RegularItems.model.js";

await User.sync({ alter: true, force: false });
await OrganizationBasic.sync({ alter: true, force: false });
await AccountTemplateDetails.sync({ alter: true, force: false });
await AccountsOfTemplate.sync({ alter: true, force: false });
await AccountsConfig.sync({ alter: true, force: false });
// await OrganizationsUsers.sync({alter:false, force: false})
await TaxRates.sync({ alter: true, force: false });
await RegularItems.sync({ alter: true, force: false });

export {
  User,
  OrganizationBasic,
  OrganizationsUsers,
  AccountTemplateDetails,
  AccountsOfTemplate,
  AccountsConfig,
  TaxRates,
  RegularItems,
};
