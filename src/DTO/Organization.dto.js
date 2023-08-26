import { UserDTO } from "./index.js";

class OrganizationDTO {
  /**
   * Transform an dao to organization response
   * @param {Object} organization
   * @returns {OrganizationDetailsTypeAsDTO}
   * */
  static toOrganization(organization) {
    const return_dto = {
      name: organization.name,
      primary_address: organization.primaryAddress,
      organization_id: organization.id,
      currency_code: organization.currencyCode,
      sector: organization.sector,
      country_code: organization.countryCode,
      created_by_id: organization.createdBy,
    };
    if (organization.createdByUser) {
      return_dto.created_by = UserDTO.toUser(organization.createdByUser);
    }
    return return_dto;
  }

  static toOrganizationCreate(organization_payload) {
    return {
      name: organization_payload.name,
      primaryAddress: organization_payload.primary_address,
      currencyCode: organization_payload.currency_code,
      countryCode: organization_payload.country_code,
      sector: organization_payload.sector,
    };
  }
}

export default OrganizationDTO;
