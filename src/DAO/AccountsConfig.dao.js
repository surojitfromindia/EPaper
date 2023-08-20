import { AccountsConfig } from "../Models/index.js";

class AccountsConfigDao {
  async create({ accounts_config_details }, { transaction }) {
    return await AccountsConfig.create(accounts_config_details, {
      transaction,
    });
  }

  async get({ account_id }) {
    return await AccountsConfig.findByPk(account_id);
  }
}

export default Object.freeze(new AccountsConfigDao());
