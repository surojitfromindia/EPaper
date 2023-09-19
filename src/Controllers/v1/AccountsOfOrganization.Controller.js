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
addAccountToOrganization = SuccessErrorWrapper(
  addAccountToOrganization,
  "chart of account created",
  201,
);

let getAllAccounts = async (req) => {
  const clientInfo = req.clientInfo;
  const showAsTree = req.query["show_as_tree"] === "true" && true;
  const accounts = await AccountsOfOrganizationService.getAllAccounts({
    client_info: clientInfo,
    as_tree: showAsTree,
  });
  return { chart_of_accounts: accounts };
};
getAllAccounts = SuccessErrorWrapper(getAllAccounts, "done", 200);

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
getAccountEditPage = SuccessErrorWrapper(getAccountEditPage, "done", 200);

let deleteAccounts = async (req) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const accountIds =
    req_query.account_ids &&
    req_query.account_ids.split(",").map((e) => Number(e));
  await AccountsOfOrganizationService.deleteAccounts({
    client_info: clientInfo,
    account_ids: accountIds,
  });
  return { account_ids: accountIds };
};
deleteAccounts = SuccessErrorWrapper(
  deleteAccounts,
  "selected accounts has been deleted",
  204,
);

let deleteAccount = async (req) => {
  const req_param = req?.params;
  const clientInfo = req.clientInfo;
  const accountIds = req_param && [Number(req_param.id)];
  await AccountsOfOrganizationService.deleteAccounts({
    client_info: clientInfo,
    account_ids: accountIds,
  });
  return { account_ids: accountIds };
};
deleteAccount = SuccessErrorWrapper(
  deleteAccount,
  "selected account has been deleted",
  204,
);

let getAccount = async (req) => {
  const req_params = req?.params;
  const clientInfo = req.clientInfo;
  const accountId = Number(req_params.id);

  const accounts = await AccountsOfOrganizationService.getAccount({
    client_info: clientInfo,
    account_id: accountId,
  });
  return { chart_of_account: accounts };
};
getAccount = SuccessErrorWrapper(getAccount, "done", 200);

export {
  addAccountToOrganization,
  getAllAccounts,
  getAccountEditPage,
  deleteAccount,
  deleteAccounts,
  getAccount,
};
