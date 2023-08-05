import * as XLSX from 'xlsx';
import {readFileSync} from 'node:fs';
import {AccountsOfTemplateDao, AccountsTemplateDetailsDao} from '../../DAO/index.js';
import sequelize from '../../Config/DataBase.Config.js';

// here I will use xlsx, read from xlsx and create accounts that belong to a template
class AccountsOfTemplateImportService {
    async import(file_location) {
        // load the file from temp folder
        const workbook = XLSX.read(readFileSync(file_location));

        const first_sheet = workbook.Sheets['Sheet1'];
        const raw_entries = XLSX.utils.sheet_to_json(first_sheet);

        const {new_template, all_accounts_details} = await sequelize.transaction(async (t) => {
            // todo: add import validation later, such as every entry should have an account group.
            const template_details = {
                name: 'Template 1', country: 'India', sector: 'IT',
            };
            const new_template = await AccountsTemplateDetailsDao.create({template_details}, {transaction: t});
            const new_template_id = new_template.get('id');


            const all_accounts_details = [
                {
                    name: "Asset", code: "1", accountTemplateId: new_template_id
                }, {
                    name: "Equity", code: "2", accountTemplateId: new_template_id
                }, {
                    name: "Liability", code: "3", accountTemplateId: new_template_id
                }, {
                    name: "Expense", code: "4", accountTemplateId: new_template_id
                }, {
                    name: "Gain Or Loss", code: "5", accountTemplateId: new_template_id
                }
            ];
            raw_entries.forEach((acc) => {
                all_accounts_details.push({
                    name: acc.name,
                    code: acc.code.toString(),
                    tempGroupName: acc.group,
                    tempParentName: acc.parent_name ?? acc.group,
                    accountTemplateId: new_template_id
                })
            })

            const dumped_accounts = await AccountsOfTemplateDao.dumpAccounts({array_of_account_details: all_accounts_details}, {transaction: t})

            const raw_result = await AccountsOfTemplateDao.createAccountsFromDump({account_template_id: new_template_id}, {transaction: t})


            return {new_template, all_accounts_details: {dumped_accounts, raw_result}}
        });

        return {new_template, all_accounts_details};
    }
}

export default Object.freeze(new AccountsOfTemplateImportService());
