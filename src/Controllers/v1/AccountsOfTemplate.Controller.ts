import {
  AccountsTemplateImportService,
  AccountsTemplateService,
} from "../../Services/index";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { Request } from "express";

const addAccountToTemplate = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const account = await AccountsTemplateService.addAccount({
    account_details: body,
    client_info: clientInfo,
  });
  return { account };
};
const addAccountToTemplateController = SuccessErrorWrapper(
  addAccountToTemplate,
  "account added to template",
  201,
);

const importAccountsToTemplate = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const localTemplateLocation = "ListChartOfAccounts.xlsx";
  const accounts = await AccountsTemplateImportService.import({
    file_location: localTemplateLocation,
    client_info: clientInfo,
  });
  return { accounts };
};
const importAccountsToTemplateController = SuccessErrorWrapper(
  importAccountsToTemplate,
  "accounts for template imported",
  201,
);

export { addAccountToTemplateController, importAccountsToTemplateController };
