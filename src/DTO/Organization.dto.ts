import { CurrencyDTO, UserDTO } from "./index";
import { ValidityUtil } from "../Utils/ValidityUtil";

class OrganizationDTO {
  /**
   * Transform an dao to organization response
   * */
  static toOrganization(organization: any) {
    const basic_payload: any = {
      name: organization.name,
      primary_address: organization.primaryAddress,
      organization_id: organization.id,
      currency_code: organization.currencyCode,
      sector: organization.sector,
      country_code: organization.countryCode,
      created_by_id: organization.createdBy,
    };
    if (organization.createdByUser) {
      basic_payload.created_by = UserDTO.toUser(organization.createdByUser);
    }
    if (ValidityUtil.isNotEmpty(organization.Currency)) {
      Object.assign(basic_payload, {
        ...CurrencyDTO.toCurrency(organization.Currency),
      });
    }
    return basic_payload;
  }

  /**
   */
  static toOrganizationCreate(organization_payload: any) {
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
