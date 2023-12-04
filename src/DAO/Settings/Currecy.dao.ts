import { Currency } from "../../Models";

class CurrencyDAO {
  async getAll({ organization_id }) {
    return await Currency.findAll({
      where: {
        organizationId: organization_id,
      },
      raw: false,
    });
  }

  async createAll({ currency_details }, { transaction }) {
    return await Currency.bulkCreate(currency_details, {
      transaction,
    });
  }
}

export default Object.freeze(new CurrencyDAO());
