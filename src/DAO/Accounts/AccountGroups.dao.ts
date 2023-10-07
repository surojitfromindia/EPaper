import { AccountGroups } from "../../Models";

class AccountGroupsDao {
  async getAll() {
    return await AccountGroups.findAll({});
  }
}

export default Object.freeze(new AccountGroupsDao());
