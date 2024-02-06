import * as XLSX from "xlsx";
import {
  AccountsOfTemplateDao,
  AccountsTemplateDetailsDao,
  AccountTypesDao,
} from "../../DAO/index";
import sequelize from "../../Config/DataBase.Config";
import ld from "lodash";
import { FileUtil } from "../../Utils/FileUtil";

// here I will use xlsx, read from xlsx and addAccount accounts that belong to a template
class AccountsOfTemplateImportService {
  async import({ file_location, client_info }) {
    const createdBy = client_info.userId;
    const organizationId = client_info.organizationId;
    // load the file from temp folder
    const workbook = XLSX.read(FileUtil.readFromTempSync(file_location));

    const firstSheet = workbook.Sheets["accounts"];
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
        isDefault: true,
      };
      const newAccountTemplate = await AccountsTemplateDetailsDao.create(
        { template_details: templateDetails },
        { transaction: t },
      );
      const newAccountTemplateId = newAccountTemplate.get("id");

      const accountTypes = await AccountTypesDao.getAll();
      const accountTypesNameIndexed = ld.keyBy(accountTypes, "name");

      const all_accounts_details = [];
      rawEntries
        .filter((acc) => acc.name)
        .forEach((acc) => {
          const accountTypeCSV = acc["account_type"];
          const accountNameCSV = acc["name"];
          const parentCodeCSV =
            acc.parent_code?.toString().length > 0
              ? acc.parent_code?.toString()
              : null;
          const codeCSV = acc.code?.toString() ?? "";
          const isSystemAccountCSV = acc["is_system_account"];
          const accountSlugCSV = acc["account_slug"];
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
            isSystemAccount: isSystemAccountCSV,
            accountSlug: accountSlugCSV,
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
