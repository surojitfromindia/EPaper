import * as XLSX from 'xlsx';
import {readFileSync} from 'node:fs';
import {AccountsConfigDao, AccountsOfTemplateDao, AccountsTemplateDetailsDao} from '../../DAO/index.js';
import sequelize from '../../Config/DataBase.Config.js';

// here I will use xlsx, read from xlsx and create accounts that belong to a template
class AccountsOfTemplateImportService {
    async import({file_location, client_info}) {
        const createdBy = client_info.userId;
        const organizationId = client_info.organizationId
        // load the file from temp folder
        const workbook = XLSX.read(readFileSync(file_location));

        const first_sheet = workbook.Sheets['Sheet1'];
        const raw_entries = XLSX.utils.sheet_to_json(first_sheet, {
            blankrows: false
        });

        const {new_account_template} = await sequelize.transaction(async (t) => {
            // todo: add import validation later, such as every entry should have an account group.
            const template_details = {
                name: 'Template 1', country: 'India', sector: 'IT',
            };
            const new_account_template = await AccountsTemplateDetailsDao.create({template_details}, {transaction: t});
            const new_account_template_id = new_account_template.get('id');

            // create an account config belong to this template
            await AccountsConfigDao.create({
                accounts_config_details: {
                    accountTemplateId: new_account_template_id
                }
            }, {transaction: t})


            const all_accounts_details = [
                {
                    name: "Asset", code: "1", accountTemplateId: new_account_template_id, type: "group"
                }, {
                    name: "Equity", code: "3", accountTemplateId: new_account_template_id, type: "group"
                }, {
                    name: "Liability", code: "2", accountTemplateId: new_account_template_id, type: "group"
                },
                {
                    name: "Income", code: "4", accountTemplateId: new_account_template_id, type: "group"
                },
                {
                    name: "Expense", code: "5", accountTemplateId: new_account_template_id, type: "group"
                }, {
                    name: "Gain Or Loss", code: "6", accountTemplateId: new_account_template_id, type: "group"
                }
            ].map(acc => ({...acc, createdBy, organizationId}));
            raw_entries.filter(acc => acc.name).forEach((acc) => {
                all_accounts_details.push({
                    name: acc.name,
                    code: acc?.code?.toString() ?? "",
                    parentCode: acc.parent_code?.toString() ?? "",
                    accountTemplateId: new_account_template_id,
                    type: acc.parent_name ? "account" : "account_type",
                    createdBy,
                    organizationId
                })
            })
            await AccountsOfTemplateDao.dumpAccounts({array_of_account_details: all_accounts_details}, {transaction: t});
            await AccountsOfTemplateDao.createAccountsFromDump({account_template_id: new_account_template_id}, {transaction: t})

            return {new_account_template}
        });

        return {new_account_template};
    }
}

export default Object.freeze(new AccountsOfTemplateImportService());
