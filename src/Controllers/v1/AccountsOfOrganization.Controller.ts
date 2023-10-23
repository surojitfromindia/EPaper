import { AccountsOfOrganizationService } from "../../Services/index";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { Request } from "express";

const addAccountToOrganization = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const account = await AccountsOfOrganizationService.addAccount({
    account_details: body,
    client_info: clientInfo,
  });
  return { chart_of_account: account };
};
const addAccountToOrganizationController = SuccessErrorWrapper(
  addAccountToOrganization,
  "chart of account created",
  201,
);

const getAllAccounts = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const showAsTree = req.query["show_as_tree"] === "true" && true;
  const accounts = await AccountsOfOrganizationService.getAllAccounts({
    client_info: clientInfo,
    as_tree: showAsTree,
  });
  return { chart_of_accounts: accounts };
};
const getAllAccountsController = SuccessErrorWrapper(
  getAllAccounts,
  "done",
  200,
);

const getAccountEditPage = async (req: Request) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const accountId = req_query.account_id && Number(req_query.account_id);

  const editPage = await AccountsOfOrganizationService.getEditPage({
    client_info: clientInfo,
    account_id: accountId,
  });
  return { ...editPage };
};
const getAccountEditPageController = SuccessErrorWrapper(
  getAccountEditPage,
  "done",
  200,
);

const deleteAccounts = async (req: Request) => {
  const req_query = req?.query;
  const clientInfo = req.clientInfo;
  const account_ids = req_query.account_ids?.toString() ?? "";
  const accountIds = account_ids.split(",").map((e) => Number(e));
  await AccountsOfOrganizationService.deleteAccounts({
    client_info: clientInfo,
    account_ids: accountIds,
  });
  return { account_ids: accountIds };
};
const deleteAccountsController = SuccessErrorWrapper(
  deleteAccounts,
  "selected accounts has been deleted",
  200,
);

const deleteAccount = async (req: Request) => {
  const req_param = req?.params;
  const clientInfo = req.clientInfo;
  const accountIds = req_param && [Number(req_param.id)];
  await AccountsOfOrganizationService.deleteAccounts({
    client_info: clientInfo,
    account_ids: accountIds,
  });
  return { account_ids: accountIds };
};
const deleteAccountController = SuccessErrorWrapper(
  deleteAccount,
  "selected account has been deleted",
  200,
);

const getAccount = async (req: Request) => {
  const req_params = req?.params;
  const clientInfo = req.clientInfo;
  const accountId = Number(req_params.id);

  const accounts = await AccountsOfOrganizationService.getAccount({
    client_info: clientInfo,
    account_id: accountId,
  });
  return { chart_of_account: accounts };
};
const getAccountController = SuccessErrorWrapper(getAccount, "done", 200);

export {
  addAccountToOrganizationController,
  getAllAccountsController,
  getAccountEditPageController,
  deleteAccountController,
  deleteAccountsController,
  getAccountController,
};
