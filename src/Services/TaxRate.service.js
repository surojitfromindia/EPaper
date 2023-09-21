// here I handle business logic
import sequelize from "../Config/DataBase.Config.js";
import { TaxRateDTO } from "../DTO/index.js";
import { TaxRateDao } from "../DAO/index.js";
import TaxRateDto from "../DTO/TaxRate.dto.js";
import { DataNotFoundError } from "../Errors/APIErrors/index.js";
import { TAX_DEFAULTS } from "../Constants/Taxes.Constant.js";

class TaxRateService {
  async create({ tax_rate_details, client_info }) {
    const taxRateDetailsFromPayload =
      TaxRateDTO.toTaxRateCreate(tax_rate_details);
    const created_user = await sequelize.transaction(async (t1) => {
      const taxRateDetails = {
        ...taxRateDetailsFromPayload,
        organizationId: client_info.organizationId,
        createdBy: client_info.userId,
        taxType: "direct_tax",
      };
      return await TaxRateDao.create(
        { tax_rate_details: taxRateDetails },
        { transaction: t1 },
      );
    });
    return TaxRateDTO.toTaxRate(created_user);
  }

  async getAllTaxRates({ client_info }) {
    const organizationId = client_info.organizationId;
    const tax_rates = await TaxRateDao.getAll({
      organization_id: organizationId,
    });
    return tax_rates.map((user) => TaxRateDTO.toTaxRate(user));
  }

  async getATaxRate({ tax_rate_id, client_info }) {
    const organizationId = client_info.organizationId;
    const taxRate = await TaxRateDao.get({
      tax_rate_id,
      organization_id: organizationId,
    });
    if (taxRate) {
      return TaxRateDto.toTaxRate(taxRate);
    }
    throw new DataNotFoundError();
  }

  async updateATaxRate({ tax_rate_id, tax_rate_details, client_info }) {
    const taxRateDetailsFromPayload =
      TaxRateDTO.toTaxRateUpdate(tax_rate_details);
    const updatedTaxRate = await sequelize.transaction(async (t1) => {
      return await TaxRateDao.updateTaxRate(
        {
          tax_rate_details: taxRateDetailsFromPayload,
          tax_rate_id,
          organization_id: client_info.organizationId,
        },
        { transaction: t1 },
      );
    });

    if (updatedTaxRate) {
      return TaxRateDto.toTaxRate(updatedTaxRate);
    }
    throw new DataNotFoundError();
  }

  async initDefaultTaxRates(
    { client_info, organization_id, organization_country_code },
    { transaction },
  ) {
    const organizationId = organization_id;
    const userId = client_info.userId;
    let taxRates = TAX_DEFAULTS._OTHER_;
    const countryTaxRates = TAX_DEFAULTS[organization_country_code];
    if (countryTaxRates) {
      taxRates = countryTaxRates.map((tax) => ({
        ...tax,
        organizationId,
        createdBy: userId,
      }));
    }
    return await sequelize.transaction(async (t1) => {
      return await TaxRateDao.createAll(
        {
          tax_rates_details: taxRates,
        },
        { transaction },
      );
    });
  }
}

export default Object.freeze(new TaxRateService());
