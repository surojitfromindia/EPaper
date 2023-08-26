import sequelize from "../Config/DataBase.Config.js";
import {
  AccountsOfOrganizationDao,
  AccountsOfTemplateDao,
  AccountsTemplateDetailsDao,
} from "../DAO/index.js";
import { AccountsOfOrganizationDTO } from "../DTO/index.js";
import { DataNotFoundError } from "../Errors/APIErrors/index.js";
import ld from "lodash";

class AccountsOfOrganizationService {
  /**
   * Add a single account to organization
   * @param {Object} account_details
   * @param {ClientInfoType} client_info
   * @returns {Promise<{account_id: *, code: *, depth: *, name: *}>}
   */
  async addAccount({ account_details, client_info }) {
    const organizationId = client_info.organizationId;
    const createdBy = client_info.userId;

    const newAccountDetails =
      AccountsOfOrganizationDTO.toAccountOfOrganizationCreate(account_details);
    let accountTemplateId = newAccountDetails.accountTemplateId;
    newAccountDetails.createdBy = createdBy;
    newAccountDetails.organizationId = organizationId;

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
          const parentAccountDetails = await AccountsOfOrganizationDao.get({
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
        const createdAccount = await AccountsOfOrganizationDao.create(
          { account_details: newAccountDetails },
          { transaction: t1 },
        );
        return AccountsOfOrganizationDTO.toAccountOfOrganization(
          createdAccount,
        );
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * At time of organization creation we also create a set of accounts
   * @param {number} organization_id
   * @param {string} country_code
   * @param {sector} sector
   * @param {ClientInfoType} client_info
   * @param {SequelizeTransaction} transaction
   * @returns {Promise<void>}
   */
  async copyAccountsFromTemplateToOrganization(
    { organization_id, country_code, sector, client_info },
    { transaction },
  ) {
    const userId = client_info.userId; // when creating an organization, we wouldn't have the organization id in client info
    // first. we look from template for matching template
    const countryMatchingTemplate =
      await AccountsTemplateDetailsDao.getByCountryAndSector({
        country_code,
        sector,
      });
    let templateId = countryMatchingTemplate
      ? countryMatchingTemplate.id
      : // if not found, use the default
        (await AccountsTemplateDetailsDao.getDefaultTemplate()).id;
    if (!templateId) {
      throw new DataNotFoundError("No account template found.");
    }
    // get the accounts of the template
    const templateAccounts =
      await AccountsOfTemplateDao.getAccountsByTemplateId(
        {
          template_id: templateId,
        },
        { raw: true },
      );

    // bulk create, then map, the update the accounts of organization
    // before that we create a template for the organization
    const newAccountTemplate = await AccountsTemplateDetailsDao.create(
      {
        template_details: {
          organizationId: organization_id,
          sector,
          countryCode: country_code,
          name: `Account template for organization ${organization_id}`,
          createdBy: userId,
          originTemplateId: templateId,
        },
      },
      { transaction },
    );
    const newAccountTemplateId = newAccountTemplate.id;
    await this.#createAccounts(
      {
        template_accounts: templateAccounts,
        new_account_template_id: newAccountTemplateId,
        organization_id,
        user_id: userId,
      },
      {
        transaction,
      },
    );
  }

  /**
   * copy accounts of a template to the accounts of organization table, this table only store accounts
   * that are used inside the organization
   * @param {Array<Object>} template_accounts
   * @param {number} new_account_template_id
   * @param {number} organization_id
   * @param {number} user_id
   * @param {SequelizeTransaction} transaction
   * @returns {Promise<void>}
   */
  async #createAccounts(
    { template_accounts, new_account_template_id, organization_id, user_id },
    { transaction },
  ) {
    const newAccounts = template_accounts.map(({ id, ...acc }) => ({
      ...acc,
      // information from template, used to correctly linking nodes
      originAccountId: id,
      originAccountParentId: acc.accountParentId,
      originAccountTypeId: acc.accountTypeId,
      originAccountGroupId: acc.accountGroupId,
      // common payload
      accountTemplateId: new_account_template_id,
      createdBy: user_id,
      organizationId: organization_id,
    }));
    // create new accounts by copying the old accounts but replacing the organizationId and createdBy
    let newCreatedAccounts = await AccountsOfOrganizationDao.createAccounts(
      {
        accounts: newAccounts,
      },
      { transaction },
    );
    newCreatedAccounts = newCreatedAccounts.map((acc) =>
      acc.get({ plain: true }),
    );

    // link those accounts with parent and map.
    const accountUpdateArray = this.#mapTempAccounts({
      new_temp_accounts: newCreatedAccounts,
    });

    // now we bulk update the accounts
    await AccountsOfOrganizationDao.bulkUpdateAccounts(
      {
        accounts: accountUpdateArray,
      },
      {
        transaction,
        update_on_duplicate: [
          "accountParentId",
          "accountGroupId",
          "accountTypeId",
        ],
      },
    );
  }

  /**
   *  Link temporally created accounts with parent-child way and returned the updated accounts.
   * @param {Array<Object>} new_temp_accounts
   * @returns {Array<Object>}
   */
  #mapTempAccounts({ new_temp_accounts }) {
    // after creating the accounts, we replace the accountParentId, accountTypeId, accountGroupId
    // but before that we need to make a key-pair object using lodash
    const newAccountsDic = ld.keyBy(new_temp_accounts, "originAccountId");

    // for each account of 'newCreatedAccounts' we find its (accountParentId, accountTypeId, accountGroupId)
    // from 'newAccountsDic' and use 'id' of that element (of newAccountsDic) to replace with
    // (accountParentId, accountTypeId, accountGroupId)
    return new_temp_accounts.map((acc) => {
      const updateAccount = {
        ...acc,
        id: acc.id,
        accountParentId: null,
        accountTypeId: null,
        accountGroupId: null,
      };
      const accountParentId = acc.originAccountParentId;
      const accountTypeId = acc.originAccountTypeId;
      const accountGroupId = acc.originAccountGroupId;
      // find and replace, if not found, set as null.
      if (accountParentId) {
        updateAccount.accountParentId =
          newAccountsDic[accountParentId]?.id ?? null;
      }
      if (accountTypeId) {
        updateAccount.accountTypeId = newAccountsDic[accountTypeId]?.id ?? null;
      }
      if (accountGroupId) {
        updateAccount.accountGroupId =
          newAccountsDic[accountGroupId]?.id ?? null;
      }
      return updateAccount;
    });
  }
}

export default Object.freeze(new AccountsOfOrganizationService());
