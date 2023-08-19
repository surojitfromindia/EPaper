import {AccountsTemplateImportService, AccountsTemplateService} from "../../Services/index.js";
import {SuccessErrorWrapper} from "../../Utils/SuccessErrorWrapper.js";


let addAccountToTemplate = async (req) => {
    const clientInfo = req.clientInfo;
    const body = req.body;
    const account = await AccountsTemplateService.addAccount({account_details: body, client_info: clientInfo});
    return {account};
}
addAccountToTemplate = SuccessErrorWrapper(addAccountToTemplate, 201)

let importAccountsToTemplate = async (req) => {
    const clientInfo = req.clientInfo;
    const localTemplateLocation = __baseDir + "/temp/ListChartOfAccounts.xlsx";
    const accounts = await AccountsTemplateImportService.import({
        file_location: localTemplateLocation,
        client_info: clientInfo
    });
    return {accounts};
}
importAccountsToTemplate = SuccessErrorWrapper(importAccountsToTemplate, 201)

export {
    addAccountToTemplate,
    importAccountsToTemplate
} 