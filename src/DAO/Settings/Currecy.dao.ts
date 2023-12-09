import { CurrencyModel } from "../../Models";

class CurrencyDAO {
  async getAll({ organization_id }) {
    return await CurrencyModel.findAll({
      where: {
        organizationId: organization_id,
      },
      raw: false,
    });
  }

  async createAll({ currency_details }, { transaction }) {
    return await CurrencyModel.bulkCreate(currency_details, {
      transaction,
    });
  }
}

export default Object.freeze(new CurrencyDAO());
