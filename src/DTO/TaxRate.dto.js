import {OrganizationDTO, UserDTO} from "./index.js";

class TaxRateDTO {

    static toTaxRateDTO(tax_rate) {
        const basicTaxRate = {
            tax_id: tax_rate.id,
            name: tax_rate.name,
            description: tax_rate.description,
            rate: tax_rate.rate,
            country_code: tax_rate.countryCode,
            created_by: tax_rate.createdBy,
            organization_id: tax_rate.organizationId
        }
        if (tax_rate.createdByUser) {
            basicTaxRate.created_by_user = UserDTO.toUserDTO(tax_rate.createdByUser)
        }
        if (tax_rate.organization) {
            basicTaxRate.organization_working_details = OrganizationDTO.toOrganizationDTO(tax_rate.organization)
        }
        return basicTaxRate
    }

    static toTaxRateCreate(tax_rate_body) {
        return {
            name: tax_rate_body.name,
            description: tax_rate_body.description,
            rate: Number(tax_rate_body.rate ?? 0),
            countryCode: tax_rate_body.country_code,
        }
    }

    static toTaxRateUpdate(tax_rate_body) {
        return {
            name: tax_rate_body.name,
            description: tax_rate_body.description,
            rate: Number(tax_rate_body.rate ?? 0),
            countryCode: tax_rate_body.country_code,
        }
    }
}

export default TaxRateDTO