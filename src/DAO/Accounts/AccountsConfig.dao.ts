import { AccountsConfig } from "../../Models";

class AccountsConfigDao {
  async create({ accounts_config_details }, { transaction }) {
    return await AccountsConfig.create(accounts_config_details, {
      transaction,
    });
  }

  async get({ organization_id }) {
    return await AccountsConfig.findOne({
      where: { organizationId: organization_id },
    });
  }
}

export default Object.freeze(new AccountsConfigDao());
