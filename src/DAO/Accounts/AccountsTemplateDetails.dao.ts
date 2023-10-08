import { AccountTemplateDetails } from "../../Models";
import { PRIME_ORGANIZATION_ID } from "../../Constants/PrimeOrganization.Constants";

class AccountTemplateDetailsDao {
  async create({ template_details }, { transaction }) {
    const template = await AccountTemplateDetails.create(template_details, {
      transaction,
    });
    return await AccountTemplateDetails.findByPk(template.get("id"));
  }

  async getById({ template_id, organization_id }) {
    return await AccountTemplateDetails.findOne({
      where: {
        id: template_id,
        organizationId: organization_id,
      },
    });
  }

  async getByCountryAndSector({ country_code, sector }) {
    return await AccountTemplateDetails.findOne({
      where: {
        organizationId: PRIME_ORGANIZATION_ID,
        status: "active",
        countryCode: country_code,
        sector,
      },
    });
  }

  async getDefaultTemplate() {
    return await AccountTemplateDetails.findOne({
      where: {
        organizationId: PRIME_ORGANIZATION_ID,
        isDefault: true,
      },
    });
  }

  async getByOrganizationId({ organization_id }) {
    return await AccountTemplateDetails.findOne({
      where: {
        organizationId: organization_id,
      },
    });
  }
}

export default Object.freeze(new AccountTemplateDetailsDao());
