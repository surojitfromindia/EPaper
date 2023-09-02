import { AccountsOfOrganization } from "../Models/index.js";
import { Op } from "@sequelize/core";

class AccountsOfOrganizationDao {
  async create({ account_details }, { transaction }) {
    const account = await AccountsOfOrganization.create(account_details, {
      transaction,
    });
    return await AccountsOfOrganization.findByPk(account.get("id"), {
      include: [
        { model: AccountsOfOrganization, as: "AccountParent" },
        { model: AccountsOfOrganization, as: "AccountGroup" },
        { model: AccountsOfOrganization, as: "AccountType" },
      ],
    });
  }

  async getById({ account_id, organization_id }) {
    return await AccountsOfOrganization.findOne({
      where: {
        id: account_id,
        organizationId: organization_id,
      },
    });
  }

  async getAccountsFromDepth({ organization_id, depth = 2 }) {
    return await AccountsOfOrganization.findAll({
      where: {
        organizationId: organization_id,
        depth: {
          [Op.gte]: depth,
        },
      },
      include: [
        {
          required: true,
          model: AccountsOfOrganization,
          as: "AccountParent",
        },
        {
          required: true,
          model: AccountsOfOrganization,
          as: "AccountType",
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
}

export default Object.freeze(new AccountsOfOrganizationDao());
