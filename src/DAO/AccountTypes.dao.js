import { AccountTypes } from "../Models/index.js";

class AccountTypesDao {
  async getAll() {
    return await AccountTypes.findAll({});
  }
}

export default Object.freeze(new AccountTypesDao());
