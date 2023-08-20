import { User } from "./User/User.model.js";
import { OrganizationBasic } from "./Organization/Organization.model.js";
import { AccountTemplateDetails } from "./Account/AccountTemplateDetails.model.js";
import { AccountsOfTemplate } from "./Account/AccountsOfTemplate.model.js";
import { AccountsConfig } from "./Account/AccountsConfig.model.js";
import { OrganizationsUsers } from "./OrganizationsUsers.model.js";
import { TaxRates } from "./Tax/TaxRates.model.js";
import { RegularItems } from "./Item/RegularItems.model.js";

await User.sync({ alter: true, force: true });
await OrganizationBasic.sync({ alter: true, force: true });
await AccountTemplateDetails.sync({ alter: true, force: true });
await AccountsOfTemplate.sync({ alter: true, force: true });
await AccountsConfig.sync({ alter: true, force: true });
// await OrganizationsUsers.sync({alter:false, force: false})
await TaxRates.sync({ alter: true, force: true });
await RegularItems.sync({ alter: true, force: true });

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
