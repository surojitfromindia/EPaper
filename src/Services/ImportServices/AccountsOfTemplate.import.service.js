import * as XLSX from "xlsx";
import { readFileSync } from "node:fs";
import {
  AccountsConfigDao,
  AccountsOfTemplateDao,
  AccountsTemplateDetailsDao,
} from "../../DAO/index.js";
import sequelize from "../../Config/DataBase.Config.js";

// here I will use xlsx, read from xlsx and addAccount accounts that belong to a template
class AccountsOfTemplateImportService {
  async import({ file_location, client_info }) {
    const createdBy = client_info.userId;
    const organizationId = client_info.organizationId;
    // load the file from temp folder
    const workbook = XLSX.read(readFileSync(file_location));

    const firstSheet = workbook.Sheets["Sheet1"];
    const rawEntries = XLSX.utils.sheet_to_json(firstSheet, {
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

      const all_accounts_details = [
        {
          name: "Asset",
          code: "1",
          accountTemplateId: newAccountTemplateId,
          type: "group",
        },
        {
          name: "Equity",
          code: "3",
          accountTemplateId: newAccountTemplateId,
          type: "group",
        },
        {
          name: "Liability",
          code: "2",
          accountTemplateId: newAccountTemplateId,
          type: "group",
        },
        {
          name: "Income",
          code: "4",
          accountTemplateId: newAccountTemplateId,
          type: "group",
        },
        {
          name: "Expense",
          code: "5",
          accountTemplateId: newAccountTemplateId,
          type: "group",
        },
        {
          name: "Gain Or Loss",
          code: "6",
          accountTemplateId: newAccountTemplateId,
          type: "group",
        },
      ].map((acc) => ({ ...acc, createdBy }));
      rawEntries
        .filter((acc) => acc.name)
        .forEach((acc) => {
          all_accounts_details.push({
            name: acc.name,
            code: acc?.code?.toString() ?? "",
            parentCode: acc.parent_code?.toString() ?? "",
            accountTemplateId: newAccountTemplateId,
            type: acc.parent_name ? "account" : "account_type",
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
