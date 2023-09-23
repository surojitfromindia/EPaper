import {
  AccountGroups,
  AccountsOfOrganization,
  AccountTypes,
} from "../../Models/index.js";
import { Op, sql } from "@sequelize/core";

const DEFAULT_SELECTED_ATTRIBUTES = [
  "id",
  "name",
  "code",
  "accountParentId",
  "accountTypeId",
  "accountGroupId",
  "description",
  "status",
  "depth",
];
const DEFAULT_ACCOUNT_PARENT_ATTRIBUTES = ["id", "name"];
const DEFAULT_ACCOUNT_TYPE_ATTRIBUTES = ["id", "name", "nameFormatted"];
const DEFAULT_ACCOUNT_GROUP_ATTRIBUTES = ["id", "name", "nameFormatted"];
class AccountsOfOrganizationDao {
  async create({ account_details }, { transaction }) {
    const account = await AccountsOfOrganization.create(account_details, {
      transaction,
    });
    return await AccountsOfOrganization.findByPk(account.get("id"), {
      include: [
        { model: AccountsOfOrganization, as: "AccountParent", required: false },
        { model: AccountGroups, as: "AccountGroup" },
        { model: AccountTypes, as: "AccountType" },
      ],
    });
  }

  async getById({ account_id, organization_id }) {
    return await AccountsOfOrganization.findOne({
      where: {
        id: account_id,
        organizationId: organization_id,
        status: "active",
      },
      include: [
        { model: AccountsOfOrganization, as: "AccountParent", required: false },
        { model: AccountGroups, as: "AccountGroup" },
        { model: AccountTypes, as: "AccountType" },
      ],
    });
  }

  async getAccountsFromDepth({ organization_id, depth = 0 }) {
    return await AccountsOfOrganization.findAll({
      attributes: DEFAULT_SELECTED_ATTRIBUTES,
      where: {
        organizationId: organization_id,
        depth: {
          [Op.gte]: depth,
        },
        status: "active",
      },
      include: [
        {
          attributes: DEFAULT_ACCOUNT_PARENT_ATTRIBUTES,
          required: false,
          model: AccountsOfOrganization,
          as: "AccountParent",
        },
        {
          attributes: DEFAULT_ACCOUNT_TYPE_ATTRIBUTES,
          required: true,
          model: AccountTypes,
          as: "AccountType",
        },
        {
          attributes: DEFAULT_ACCOUNT_GROUP_ATTRIBUTES,
          required: true,
          model: AccountGroups,
          as: "AccountGroup",
        },
      ],
    });
  }

  async createAccounts({ accounts }, { transaction }) {
    return await AccountsOfOrganization.bulkCreate(accounts, {
      transaction,
    });
  }

  async bulkUpdateAccounts(
    { accounts },
    { transaction, update_on_duplicate = [], raw = false },
  ) {
    return await AccountsOfOrganization.bulkCreate(accounts, {
      transaction,
      updateOnDuplicate: update_on_duplicate,
      raw,
    });
  }

  async getAccountsOnlyIdAndNames({ account_ids = [], organization_id }) {
    return AccountsOfOrganization.findAll({
      where: {
        organizationId: organization_id,
        id: {
          [Op.in]: account_ids,
        },
        status: {
          [Op.in]: ["active", "inactive"],
        },
      },
      attributes: ["id", "status", "name"],
    });
  }

  async markAccountAsDeleted(
    { account_ids = [], organization_id },
    { transaction },
  ) {
    await this.#updateAccountsStatus(
      {
        account_ids,
        organization_id,
        status: "deleted",
      },
      {
        transaction,
      },
    );
    return true;
  }

  async #updateAccountsStatus(
    { account_ids = [], organization_id, status },
    { transaction },
  ) {
    await AccountsOfOrganization.update(
      {
        status,
      },
      {
        where: {
          organizationId: organization_id,
          id: {
            [Op.in]: account_ids,
          },
          status: {
            [Op.in]: ["active", "inactive"],
          },
        },
        transaction,
      },
    );
  }

  /**
   *
   * @param {number} organization_id
   * @param {string[]} account_types
   * @return {Promise<any[]>}
   */
  async getAccountsByAccountTypes({ organization_id, account_types }) {
    return await AccountsOfOrganization.findAll({
      attributes: DEFAULT_SELECTED_ATTRIBUTES,
      where: {
        organizationId: organization_id,
        status: "active",
        accountTypeId: {
          [Op.in]: sql`(select "id" from "AccountTypes" where "name" = any ($account_types))`,
        },
      },
      bind: {
        account_types,
      },
      include: [
        {
          attributes: DEFAULT_ACCOUNT_TYPE_ATTRIBUTES,
          model: AccountTypes,
          as: "AccountType",
        },
      ],
    });
  }
}

export default Object.freeze(new AccountsOfOrganizationDao());
