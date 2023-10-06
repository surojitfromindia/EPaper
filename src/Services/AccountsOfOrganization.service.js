import sequelize from "../Config/DataBase.Config.js";
import {
  AccountsOfOrganizationDao,
  AccountsOfTemplateDao,
  AccountsTemplateDetailsDao,
  AccountTypesDao,
} from "../DAO/index.js";
import { AccountsOfOrganizationDTO } from "../DTO/index.js";
import { DataNotFoundError } from "../Errors/APIErrors/index.js";
import ld from "lodash";
import { AccountsTree } from "../Utils/AccoutsTree.js";

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
    // let accountTemplateId = newAccountDetails.accountTemplateId;
    newAccountDetails.createdBy = createdBy;
    newAccountDetails.organizationId = organizationId;

    // find the account template
    const accountTemplateDetails =
      await AccountsTemplateDetailsDao.getByOrganizationId({
        organization_id: organizationId,
      });
    if (!accountTemplateDetails) {
      throw new DataNotFoundError("Account template not found");
    }
    newAccountDetails.accountTemplateId = accountTemplateDetails.id;

    // find the account type and grab the group id
    const accountTypeName = newAccountDetails.accountTypeName;
    const accountTypeDetails = await AccountTypesDao.getByName({
      name: accountTypeName,
    });
    if (accountTypeDetails === null) {
      throw new DataNotFoundError("Account type not found");
    }
    newAccountDetails.accountTypeId = accountTypeDetails.id;
    newAccountDetails.accountGroupId = accountTypeDetails.accountGroupId;

    // a parent is optional
    let newAccountDepth = 0;
    if (newAccountDetails.accountParentId) {
      const parentAccountDetails = await AccountsOfOrganizationDao.getById({
        account_id: newAccountDetails.accountParentId,
        organization_id: organizationId,
      });
      newAccountDepth = parentAccountDetails.depth + 1;
      if (!parentAccountDetails) {
        throw new DataNotFoundError("Parent account not found");
      }
    }
    newAccountDetails.depth = newAccountDepth;

    try {
      return await sequelize.transaction(async (t1) => {
        // save in the database
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
   * @desc get chart of accounts
   * @param {boolean} as_tree
   * @param {ClientInfoType} client_info
   * @return {Promise<*[]>}
   */
  async getAllAccounts({ as_tree, client_info }) {
    const organizationId = client_info.organizationId;
    const accounts = await AccountsOfOrganizationDao.getAccountsFromDepth({
      organization_id: organizationId,
      depth: 0,
    });
    const treeOfAccounts = AccountsTree.createTreeOfOrganizationAccountsAsDTO({
      accounts: accounts,
    });
    if (as_tree) {
      return treeOfAccounts.getTreeArray();
    } else {
      return treeOfAccounts.flatArrayFromTreeAsDTO();
    }
  }

  /**
   * @desc get edit page for account add or edit
   * @param {ClientInfoType} client_info
   * @param {number=} account_id provided an account id if fetching for edit.
   * @return {Promise<{accounts_list: *, account_types: *}>}
   */
  async getEditPage({ client_info, account_id }) {
    const organizationId = client_info.organizationId;
    let accountDetails = null;
    let accountTypes;
    let accountsListAsDTO;

    // if account_id exists, we the account details
    if (account_id) {
      accountDetails = await this.#getAccount({
        account_id,
        organization_id: organizationId,
      });
    }

    accountTypes = await AccountTypesDao.getAll();

    accountsListAsDTO = await this.getAllAccounts({
      as_tree: false,
      client_info,
    });
    return AccountsOfOrganizationDTO.toAccountEditPage({
      account_details: accountDetails,
      account_types: accountTypes,
      account_list_as_dto: accountsListAsDTO,
    });
  }

  /**
   * @desc Delete multiple accounts
   * @param {ClientInfoType} client_info
   * @param {number[]} account_ids
   * @return {Promise<boolean>}
   */
  async deleteAccounts({ client_info, account_ids = [] }) {
    try {
      const organizationId = client_info.organizationId;
      return await sequelize.transaction(async (t1) => {
        await this.#markAccountsAsDeleted(
          { account_ids, organization_id: organizationId },
          { transaction: t1 },
        );
        return true;
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {object} options
   * @param {ClientInfoType} options.client_info
   * @param {number} options.account_id
   * @return {Promise<any>}
   */
  async getAccount({ client_info, account_id }) {
    const organizationId = client_info.organizationId;
    const account = await this.#getAccount({
      organization_id: organizationId,
      account_id,
    });
    return AccountsOfOrganizationDTO.toAccountOfOrganization(account);
  }

  /**
   * Remove a list of accounts
   * @param {object} options
   * @param {number} options.organization_id
   * @param {Array.<number>} options.account_ids
   * @param {object} options2
   * @param {SequelizeTransaction} options2.transaction
   * @return {Promise<{errors: *[]}>}} return array of errors.
   */
  async #markAccountsAsDeleted(
    { account_ids = [], organization_id },
    { transaction },
  ) {
    const accountsFound =
      await AccountsOfOrganizationDao.getAccountsOnlyIdAndNames({
        account_ids,
        organization_id,
      });
    const errors = [];
    // now check if each of the 'account_ids' exist in 'accountsFound'
    for (let account_id of account_ids) {
      const accountFound = accountsFound.findIndex(
        (acc) => acc?.id === account_id,
      );
      if (accountFound === -1) {
        errors.push(new DataNotFoundError(`${account_id} does not exists`));
        break;
      }
    }
    if (errors.length > 0) {
      return { errors };
    }

    // update the account status
    await AccountsOfOrganizationDao.markAccountAsDeleted(
      {
        organization_id,
        account_ids,
      },
      { transaction },
    );

    return { errors: [] };
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

      accountParentId: null,
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
    const accountUpdateArray = AccountsOfOrganizationUtils.mapTempAccounts({
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
   * @desc get account
   * @param {ClientInfoType} client_info
   * @param {number} account_id
   * @return {Promise<any>}
   */
  async #getAccount({ account_id, organization_id }) {
    const account = await AccountsOfOrganizationDao.getById({
      account_id,
      organization_id,
    });
    if (!account) {
      throw new DataNotFoundError("Account not found");
    }
    return account;
  }

  /**
   * get accounts related to item
   * @param client_info
   * @return {AccountsOfItem}
   */
  ofItem({ client_info }) {
    return new AccountsOfItem({ client_info });
  }
}

export default Object.freeze(new AccountsOfOrganizationService());

class AccountsOfOrganizationUtils {
  /**
   *  Link temporally created accounts with parent-child way and returned the updated accounts.
   * @param {Array<Object>} new_temp_accounts
   * @returns {Array<Object>}
   */
  static mapTempAccounts({ new_temp_accounts }) {
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
      };
      const accountParentId = acc.originAccountParentId;
      // find and replace, if not found, set as null.
      if (accountParentId) {
        updateAccount.accountParentId =
          newAccountsDic[accountParentId]?.id ?? null;
      }
      return updateAccount;
    });
  }
}

class AccountsOfItem {
  constructor({ client_info }) {
    this.client_info = client_info;
  }

  async getAccountsForItem() {
    const organizationId = this.client_info.organizationId;
    const fetchAccountTypes = ["income", "expense", "cost_of_goods_sold"];
    const income_accounts_list = [];
    const purchase_accounts_list = [];
    const inventory_accounts_list = [];
    // return income accounts and purchase accounts
    const accounts = await AccountsOfOrganizationDao.getAccountsByAccountTypes({
      organization_id: organizationId,
      account_types: fetchAccountTypes,
    });
    for (const account of accounts) {
      switch (account?.AccountType?.name) {
        case "income":
          income_accounts_list.push(account);
          break;
        case "expense":
        case "cost_of_goods_sold":
          purchase_accounts_list.push(account);
          break;
      }
    }
    return {
      purchase_accounts_list,
      income_accounts_list,
      inventory_accounts_list,
    };
  }
}

export { AccountsOfItem };
