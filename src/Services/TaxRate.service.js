// here I handle business logic
import sequelize from '../Config/DataBase.Config.js';
import {TaxRateDTO} from '../DTO/index.js';
import {TaxRateDao} from '../DAO/index.js';
import TaxRateDto from "../DTO/TaxRate.dto.js";

class TaxRateService {
    async create({tax_rate_details, organization_id, user_id}) {
        const taxRateDetailsFromPayload = TaxRateDTO.toTaxRateCreate(tax_rate_details);
        try {
            const created_user = await sequelize.transaction(async (t1) => {
                const taxRateDetails = {
                    ...taxRateDetailsFromPayload,
                    organizationId: organization_id,
                    createdBy: user_id,
                    taxType: "direct_tax"
                }
                return await TaxRateDao.create({tax_rate_details: taxRateDetails}, {transaction: t1});
            });
            return TaxRateDTO.toTaxRateDTO(created_user);
        } catch (error) {
            console.log("Something went wrong", error.message)
            return null;
        }
    }

    async getAllTaxRates({organization_id}) {
        const tax_rates = await TaxRateDao.getAll({organization_id});
        return tax_rates.map((user) => TaxRateDTO.toTaxRateDTO(user));
    }

    async getATaxRate({tax_rate_id, organization_id}) {
        const taxRate = await TaxRateDao.get({tax_rate_id, organization_id})
        return TaxRateDto.toTaxRateDTO(taxRate)
    }
}

export default Object.freeze(new TaxRateService());
