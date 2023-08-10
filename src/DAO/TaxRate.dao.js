import {TaxRates} from '../Models/index.js';

class TaxRateDao {
    async create({tax_rate_details}, {transaction}) {
        const taxRates = await TaxRates.create(tax_rate_details, {
            transaction
        });
        return await TaxRates.findByPk(taxRates.get("id"),);
    }

    async get({tax_rate_id, organization_id}) {
        return await TaxRates.findOne({
            where: {
                id: tax_rate_id,
                organization_id,
            }
        })
    }

    async getAll({organization_id}) {
        return await TaxRates.findAll({
            where: {
                organization_id
            }
        })
    }
}

export default Object.freeze(new TaxRateDao());