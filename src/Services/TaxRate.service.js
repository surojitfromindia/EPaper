// here I handle business logic
import sequelize from '../Config/DataBase.Config.js';
import {TaxRateDTO} from '../DTO/index.js';
import {TaxRateDao} from '../DAO/index.js';
import TaxRateDto from "../DTO/TaxRate.dto.js";
import {DataNotFoundError} from "../Errors/APIErrors/index.js";

class TaxRateService {
    async create({tax_rate_details, client_info}) {
        const taxRateDetailsFromPayload = TaxRateDTO.toTaxRateCreate(tax_rate_details);
        const created_user = await sequelize.transaction(async (t1) => {
            const taxRateDetails = {
                ...taxRateDetailsFromPayload,
                organizationId: client_info.organizationId,
                createdBy: client_info.userId,
                taxType: "direct_tax"
            }
            return await TaxRateDao.create({tax_rate_details: taxRateDetails}, {transaction: t1});
        });
        return TaxRateDTO.toTaxRateDTO(created_user);
    }

    async getAllTaxRates({client_info}) {
        const organizationId = client_info.organizationId;
        const tax_rates = await TaxRateDao.getAll({organization_id: organizationId});
        return tax_rates.map((user) => TaxRateDTO.toTaxRateDTO(user));
    }

    async getATaxRate({tax_rate_id, client_info}) {
        const organizationId = client_info.organizationId
        const taxRate = await TaxRateDao.get({tax_rate_id, organization_id: organizationId})
        if (taxRate) {
            return TaxRateDto.toTaxRateDTO(taxRate)
        }
        throw new DataNotFoundError()
    }

    async updateATaxRate({tax_rate_id, tax_rate_details, client_info}) {
        const taxRateDetailsFromPayload = TaxRateDTO.toTaxRateUpdate(tax_rate_details);
        const taxRate = await TaxRateDao.updateTaxRate({
            tax_rate_details: taxRateDetailsFromPayload,
            tax_rate_id,
            organization_id: client_info.organizationId
        })
        if (taxRate) {
            return TaxRateDto.toTaxRateDTO(taxRate)
        }
        throw new DataNotFoundError()
    }
}

export default Object.freeze(new TaxRateService());
