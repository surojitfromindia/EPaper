import { AccountsOfOrganizationService } from "../../Services/index.js";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper.js";

let addAccountToOrganization = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const account = await AccountsOfOrganizationService.addAccount({
    account_details: body,
    client_info: clientInfo,
  });
  return { account };
};
addAccountToOrganization = SuccessErrorWrapper(addAccountToOrganization, 201);

export { addAccountToOrganization };
