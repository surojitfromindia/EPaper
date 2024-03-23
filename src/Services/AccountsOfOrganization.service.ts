import sequelize from "../Config/DataBase.Config";
import {
  AccountsConfigDao,
  AccountsOfOrganizationDao,
  AccountsOfTemplateDao,
  AccountsTemplateDetailsDao,
  AccountTypesDao,
} from "../DAO/index";
import { AccountsOfOrganizationDTO } from "../DTO/index";
import { DataNotFoundError } from "../Errors/APIErrors/index";
import ld from "lodash";
import { AccountsTree } from "../Utils/AccoutsTree";
import { ClientInfo } from "../Middlewares/Authorization/Authorization.middleware";
import { AccountConfigCreatableType } from "../Models/Account/AccountsConfig.model";
import { AccountTypes } from "Models";
import { AccountsConfigRedisDAO } from "../RedisDAO";

class AccountsOfOrganizationService {
  /**
   * Add a single account to organization
   */
  async addAccount({ account_details, client_info }) {
    const organizationId = client_info.organizationId;
    const createdBy = client_info.userId;

    const newAccountDetails =
      AccountsOfOrganizationDTO.toAccountOfOrganizationCreate(account_details);
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
   */
  async getAllAccounts({ as_tree, client_info }) {
    const organizationId = client_info.organizationId;

    // update the redis
    const accountConfig = await AccountsConfigDao.get({
      organization_id: organizationId,
    });
    const accountConfigRedisDAO = new AccountsConfigRedisDAO();
    accountConfigRedisDAO.save(accountConfig).catch();

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
   */
  async getEditPage({ client_info, account_id }) {
    const organizationId = client_info.organizationId;
    let accountDetails = null;
    let accountTypes: AccountTypes[];
    let accountsListAsDTO: any[];

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
          isDefault: false,
        },
      },
      { transaction },
    );
    const newAccountTemplateId = newAccountTemplate.id;

    const createdAccounts = await this.#createAccounts(
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
    // need to create account config for the organization
    const accountSlugIndexed = ld.keyBy(createdAccounts, "accountSlug");
    const accountConfig: AccountConfigCreatableType = {
      organizationId: organization_id,
      accountTemplateId: newAccountTemplateId,
      defaultAccountsPayableAccountId:
        accountSlugIndexed["accounts_payable"]?.id ?? null,
      defaultAccountsReceivableAccountId:
        accountSlugIndexed["accounts_receivable"].id ?? null,
      defaultBadDebtAccountId: accountSlugIndexed["bad_debit"]?.id ?? null,
      defaultBankAccountId: accountSlugIndexed["petty_cash"]?.id ?? null,
      defaultCostOfGoodsSoldAccountId:
        accountSlugIndexed["cost_of_goods_sold"]?.id ?? null,
      defaultDiscountAccountId: accountSlugIndexed["discount"]?.id ?? null,
      defaultExchangeGainLossAccountId:
        accountSlugIndexed["exchange_gain_or_loss"]?.id ?? null,
      defaultInventoryAccountId:
        accountSlugIndexed["inventory_asset"]?.id ?? null,
      defaultOpeningBalanceOffsetAccountId:
        accountSlugIndexed["opening_balance_offset"]?.id ?? null,
      defaultOpeningBalanceAdjustmentsAccountId:
        accountSlugIndexed["opening_balance_adjustments"]?.id ?? null,
      defaultPurchaseAccountId:
        accountSlugIndexed["cost_of_goods_sold"]?.id ?? null,
      defaultPurchaseDiscountAccountId:
        accountSlugIndexed["purchase_discount"]?.id ?? null,
      defaultRetainedEarningsAccountId:
        accountSlugIndexed["retained_earnings"]?.id ?? null,
      defaultSalesAccountId: accountSlugIndexed["sales"]?.id ?? null,
      defaultTaxAccountId: accountSlugIndexed["tax_payable"]?.id ?? null,
      defaultUnearnedRevenueAccountId:
        accountSlugIndexed["unearned_revenue"]?.id ?? null,
      defaultBankFeeAndChargesAccountId:
        accountSlugIndexed["bank_fees_and_charges"]?.id ?? null,
    };
    await AccountsConfigDao.create(
      { accounts_config_details: accountConfig },
      { transaction },
    );
  }

  /**
   * copy accounts of a template to the accounts of organization table, this table only store accounts
   * that are used inside the organization
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
    const newCreatedAccountsRaw =
      await AccountsOfOrganizationDao.createAccounts(
        {
          accounts: newAccounts,
        },
        { transaction },
      );
    const newCreatedAccounts = newCreatedAccountsRaw.map((acc) =>
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
    return newCreatedAccounts;
  }

  /**
   * @desc get account
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
   */
  ofItem({ client_info }: { client_info: ClientInfo }): AccountsOfItem {
    return new AccountsOfItem({ client_info });
  }

  /**
   * get an account related to invoice line item
   **/
  ofInvoiceLineItem({
    client_info,
  }: {
    client_info: ClientInfo;
  }): AccountsOfInvoiceLineItem {
    return new AccountsOfInvoiceLineItem({ client_info });
  }
}

export default Object.freeze(new AccountsOfOrganizationService());

class AccountsOfOrganizationUtils {
  /**
   *  Link temporally created accounts with parent-child way and returned the updated accounts.
   */
  static mapTempAccounts({ new_temp_accounts }) {
    // after creating the accounts, we replace the accountParentId, accountTypeId, accountGroupId
    // but before that we need to make a key-pair object using lodash
    const newAccountsDic = ld.keyBy(new_temp_accounts, "originAccountId");

    // for each account of 'newCreatedAccounts' we find its (accountParentId, accountTypeId, accountGroupId)
    // from 'newAccountsDic' and use 'id' of that element (of newAccountsDic) to replace with
    // (accountParentId, accountTypeId, accountGroupId)
    return new_temp_accounts.map((acc: any) => {
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
  client_info: ClientInfo;
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

class AccountsOfInvoiceLineItem {
  client_info: ClientInfo;

  constructor({ client_info }) {
    this.client_info = client_info;
  }

  async getAccountsForInvoiceLineItem() {
    const organizationId = this.client_info.organizationId;
    const fetchAccountTypes = [
      "other_current_asset",
      "fixed_asset",
      "other_current_liability",
      "income",
      "expense",
      "cost_of_goods_sold",
      "other_expenses",
    ];
    const line_item_accounts_list = [];
    const accounts = await AccountsOfOrganizationDao.getAccountsByAccountTypes({
      organization_id: organizationId,
      account_types: fetchAccountTypes,
    });
    line_item_accounts_list.push(...accounts);
    return {
      line_item_accounts_list,
    };
  }
}

export { AccountsOfItem, AccountsOfInvoiceLineItem };
