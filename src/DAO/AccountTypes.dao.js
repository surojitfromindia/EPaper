import { AccountGroups, AccountTypes } from "../Models/index.js";

class AccountTypesDao {
  async getAll() {
    return await AccountTypes.findAll({
      include: [{ model: AccountGroups, as: "AccountGroup" }],
    });
  }

  async getByName({ name }) {
    return await AccountTypes.findOne({
      where: {
        name: name,
      },
    });
  }
}

export default Object.freeze(new AccountTypesDao());
