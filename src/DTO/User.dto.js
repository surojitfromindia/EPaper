import organizationDto from "./Organization.dto.js";
import organizationsUsersDto from "./OrganizationsUsers.dto.js";

class UserDTO {

    static toUserDTO(user) {
        const basicUser = {
            name: user.name,
            user_id: user.id,
            email: user.email,
        }
        if (user.organizationsBasic?.length > 0) {
            basicUser.organizations = user.organizationsBasic.map(organizationDto.toOrganizationDTO)
        }
        if (user.activeOrganizations?.length > 0) {
            basicUser.organization_working_details = user.activeOrganizations.map(organizationsUsersDto.toOrganizationsUsersDTO)
        }
        return basicUser
    }

    // transform a request to a user like entity
    static toUserCreate(user_dto) {
        return {
            name: user_dto.name,
            email: user_dto.email,
            middleName: user_dto.middle_name
        }
    }
}

export default UserDTO