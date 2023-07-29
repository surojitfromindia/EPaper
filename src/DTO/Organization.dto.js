import {UserDTO} from "./index.js";

class OrganizationDTO {
    static toOrganizationDTO(organization,) {
        return {
            name: organization.name,
            primary_address: organization.primaryAddress,
            organization_id: organization.id,
            currency_code: organization.currencyCode,
            country_code: organization.countryCode,
            user_id: organization.userId,
            user: UserDTO.toUserDTO(organization.User)
        }
    }

    static toOrganizationCreate(organization_dto, user_id) {
        return {
            name: organization_dto.name,
            primaryAddress: organization_dto.primary_address,
            currencyCode: organization_dto.currency_code,
            countryCode: organization_dto.country_code,
            userId: user_id
        }
    }
}

export default OrganizationDTO;