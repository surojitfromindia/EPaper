import { TaxRates } from "../../Models";

class TaxRateDao {
  async create({ tax_rate_details }, { transaction }) {
    const taxRates = await TaxRates.create(tax_rate_details, {
      transaction,
    });
    return await TaxRates.findByPk(taxRates.get("id"));
  }

  async get({ tax_rate_id, organization_id }) {
    return await TaxRates.findOne({
      where: {
        id: tax_rate_id,
        organizationId: organization_id,
      },
    });
  }

  async getAll({ organization_id }) {
    return await TaxRates.findAll({
      where: {
        organizationId: organization_id,
      },
      raw: false,
    });
  }

  async updateTaxRate(
    { tax_rate_details, tax_rate_id, organization_id },
    { transaction },
  ) {
    await TaxRates.update(tax_rate_details, {
      where: {
        id: tax_rate_id,
        organizationId: organization_id,
      },
      transaction,
    });
    return await this.get({ tax_rate_id, organization_id });
  }

  async createAll({ tax_rates_details }, { transaction }) {
    return await TaxRates.bulkCreate(tax_rates_details, {
      transaction,
    });
  }
}

export default Object.freeze(new TaxRateDao());
