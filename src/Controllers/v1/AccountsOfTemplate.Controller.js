import {AccountsTemplateImportService, AccountsTemplateService} from "../../Services/index.js";


const createAccountOfTemplate = async (req, res) => {
    const body = req.body;
    const account = await AccountsTemplateService.create({account_details: body,});
    res.status(201).json({account});
}

const importAccountsForTemplate = async (req, res) => {
    const localTemplateLocation = __baseDir + "/temp/ListChartOfAccounts.xlsx";
    const accounts = await AccountsTemplateImportService.import(localTemplateLocation);
    res.status(200).json({accounts});
}

export {
    createAccountOfTemplate,
    importAccountsForTemplate
} 