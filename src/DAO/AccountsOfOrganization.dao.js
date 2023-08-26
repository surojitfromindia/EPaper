import { AccountsOfOrganization } from "../Models/index.js";

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

  async getById({ account_id }) {
    return await AccountsOfOrganization.findByPk(account_id);
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

  async getAccountsByTemplateId({ template_id }, { raw = false }) {
    return await AccountsOfOrganization.findAll({
      where: {
        accountTemplateId: template_id,
      },
      raw,
    });
  }
}

export default Object.freeze(new AccountsOfOrganizationDao());
