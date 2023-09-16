import { AccountsOfOrganizationService } from "../../Services/index.js";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper.js";

let addAccountToOrganization = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const account = await AccountsOfOrganizationService.addAccount({
    account_details: body,
    client_info: clientInfo,
  });
  return { chart_of_account: account };
};
addAccountToOrganization = SuccessErrorWrapper(addAccountToOrganization, 201);

let getAllAccounts = async (req) => {
  const clientInfo = req.clientInfo;
  const showAsTree = req.query["show_as_tree"] === "true" && true;
  const accounts = await AccountsOfOrganizationService.getAllAccounts({
    client_info: clientInfo,
    as_tree: showAsTree,
  });
  return { chart_of_accounts: accounts };
};
getAllAccounts = SuccessErrorWrapper(getAllAccounts, 200);

let getAccountEditPage = async (req) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const accountId = req_query.account_id && Number(req_query.account_id);

  const editPage = await AccountsOfOrganizationService.getEditPage({
    client_info: clientInfo,
    account_id: accountId,
  });
  return { ...editPage };
};
getAccountEditPage = SuccessErrorWrapper(getAccountEditPage, 200);

export { addAccountToOrganization, getAllAccounts, getAccountEditPage };
