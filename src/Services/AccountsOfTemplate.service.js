// here I handle business logic
import sequelize from "../Config/DataBase.Config.js";
import {
  AccountsOfTemplateDao,
  AccountsTemplateDetailsDao,
} from "../DAO/index.js";
import { AccountsOfTemplateDTO } from "../DTO/index.js";
import { DataNotFoundError } from "../Errors/APIErrors/index.js";

class AccountsOfTemplateService {
  async addAccount({ account_details, client_info }) {
    const organizationId = client_info.organizationId;
    const createdBy = client_info.userId;

    const newAccountDetails =
      AccountsOfTemplateDTO.toAccountsOfTemplateCreate(account_details);
    let accountTemplateId = newAccountDetails.accountTemplateId;
    newAccountDetails.createdBy = createdBy;

    // find the account template
    const accountTemplateDetails = await AccountsTemplateDetailsDao.getById({
      template_id: accountTemplateId,
      organization_id: organizationId,
    });
    if (!accountTemplateDetails) {
      throw new DataNotFoundError("Account template not found");
    }

    try {
      return await sequelize.transaction(async (t1) => {
        //set default values
        let accountDepth = 0;
        let accountType = "group";
        //check if a parent id is provided, and we getById the depth of the parent and add 1 to it
        if (newAccountDetails.accountParentId) {
          const parentAccountDetails = await AccountsOfTemplateDao.get({
            account_id: newAccountDetails.accountParentId,
          });
          if (parentAccountDetails === null) {
            throw new DataNotFoundError("Parent account not found");
          }
          accountDepth = parentAccountDetails.depth + 1;
        }
        switch (accountDepth) {
          case 0:
            accountType = "group";
            break;
          case 1:
            accountType = "account_type";
            break;
          default:
            accountType = "account";
        }
        newAccountDetails.depth = accountDepth;
        newAccountDetails.type = accountType;
        const createdAccount = await AccountsOfTemplateDao.create(
          { account_details: newAccountDetails },
          { transaction: t1 },
        );
        return AccountsOfTemplateDTO.toAccountsOfTemplate(createdAccount);
      });
    } catch (error) {
      throw error;
    }
  }
}

export default Object.freeze(new AccountsOfTemplateService());
