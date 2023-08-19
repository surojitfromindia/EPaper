import {UserDTO} from "./index.js";

class OrganizationDTO {
    static toOrganizationDTO(organization,) {
        const return_dto = {
            name: organization.name,
            primary_address: organization.primaryAddress,
            organization_id: organization.id,
            currency_code: organization.currencyCode,
            country_code: organization.countryCode,
            created_by: organization.createdBy,
        }
        if (organization.createdByUser) {
            return_dto.created_by_user = UserDTO.toUserDTO(organization.createdByUser)
        }
        return return_dto
    }

    static toOrganizationCreate(organization_payload, created_by) {
        return {
            name: organization_payload.name,
            primaryAddress: organization_payload.primary_address,
            currencyCode: organization_payload.currency_code,
            countryCode: organization_payload.country_code,
            createdBy: created_by
        }
    }
}

export default OrganizationDTO;