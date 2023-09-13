import { AccountGroups } from "../Models/index.js";

class AccountGroupsDao {
  async getAll() {
    return await AccountGroups.findAll({});
  }
}

export default Object.freeze(new AccountGroupsDao());
