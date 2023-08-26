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

let getAllAccounts = async (req) => {
  const clientInfo = req.clientInfo;
  const showAsTree = req.query["show_as_tree"] === "true" && true;
  const accounts = await AccountsOfOrganizationService.getAllAccounts({
    client_info: clientInfo,
    as_tree: showAsTree,
  });
  return { accounts };
};
getAllAccounts = SuccessErrorWrapper(getAllAccounts, 200);

export { addAccountToOrganization, getAllAccounts };
