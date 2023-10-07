import * as XLSX from "xlsx";
import { readFileSync } from "node:fs";
import {
  AccountsConfigDao,
  AccountsOfTemplateDao,
  AccountsTemplateDetailsDao,
  AccountTypesDao,
} from "../../DAO/index";
import sequelize from "../../Config/DataBase.Config";
import ld from "lodash";

// here I will use xlsx, read from xlsx and addAccount accounts that belong to a template
class AccountsOfTemplateImportService {
  async import({ file_location, client_info }) {
    const createdBy = client_info.userId;
    const organizationId = client_info.organizationId;
    // load the file from temp folder
    const workbook = XLSX.read(readFileSync(file_location));

    const firstSheet = workbook.Sheets["Sheet3"];
    const rawEntries: any[] = XLSX.utils.sheet_to_json(firstSheet, {
      blankrows: false,
    });

    const { accountTemplate } = await sequelize.transaction(async (t) => {
      const templateDetails = {
        name: "Template 1",
        countryCode: "IN",
        sector: "IT",
        createdBy,
        organizationId,
        isDefaultTemplate: true,
      };
      const newAccountTemplate = await AccountsTemplateDetailsDao.create(
        { template_details: templateDetails },
        { transaction: t },
      );
      const newAccountTemplateId = newAccountTemplate.get("id");

      // addAccount and account config belong to this template
      await AccountsConfigDao.create(
        {
          accounts_config_details: {
            accountTemplateId: newAccountTemplateId,
          },
        },
        { transaction: t },
      );

      const accountTypes = await AccountTypesDao.getAll();
      const accountTypesNameIndexed = ld.keyBy(accountTypes, "name");

      const all_accounts_details = [];
      rawEntries
        .filter((acc) => acc.name)
        .forEach((acc) => {
          const accountTypeCSV = acc.account_type;
          const accountNameCSV = acc.name;
          const parentCodeCSV =
            acc.parent_code?.toString().length > 0
              ? acc.parent_code?.toString()
              : null;
          const codeCSV = acc.code?.toString() ?? "";
          all_accounts_details.push({
            name: accountNameCSV,
            code: codeCSV,
            parentCode: parentCodeCSV,
            accountTemplateId: newAccountTemplateId,
            accountTypeId: accountTypesNameIndexed[accountTypeCSV].id,
            accountGroupId:
              accountTypesNameIndexed[accountTypeCSV].accountGroupId,
            createdBy,
            organizationId,
          });
        });
      await AccountsOfTemplateDao.dumpAccounts(
        { array_of_account_details: all_accounts_details },
        { transaction: t },
      );
      await AccountsOfTemplateDao.createAccountsFromDump(
        { account_template_id: newAccountTemplateId },
        { transaction: t },
      );

      return { accountTemplate: newAccountTemplate };
    });

    return { accountTemplate };
  }
}

export default Object.freeze(new AccountsOfTemplateImportService());
