import {OrganizationDTO, UserDTO} from "./index.js";

class OrganizationsUsersDTO {
    static toOrganizationsUsersDTO(organization_user) {
        const return_dto = {
            id: organization_user.id,
            job_status: organization_user.jobStatus,
            organization_id: organization_user.organizationId,
            user_id: organization_user.userId,
            role_id: organization_user.roleId,
            status: organization_user.status,
            invited_by: organization_user.invitedBy,
            invited_on: organization_user.invitedOn,
            accepted_on: organization_user.acceptedOn,
        }
        if (organization_user.user) {
            return_dto.user = UserDTO.toUserDTO(organization_user.user)
        }
        if (organization_user.organizationBasic) {
            return_dto.organization = OrganizationDTO.toOrganizationDTO(organization_user.organizationBasic)
        }
        return return_dto
    }

}

export default OrganizationsUsersDTO;