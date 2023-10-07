import organizationDto from "./Organization.dto";
import organizationsUsersDto from "./OrganizationsUsers.dto";

class UserDTO {
  /**
   *
   * @param {any} user
   * @returns {UserDetailsTypeAsDTO}
   */
  static toUser(user) {
    const basicUser = {
      name: user.name,
      user_id: user.id,
      email: user.email,
      organization_working_details: [],
      organizations: [],
    };
    if (user.organizationsBasic?.length > 0) {
      basicUser.organizations = user.organizationsBasic.map(
        organizationDto.toOrganization,
      );
    }
    if (user.activeOrganizations?.length > 0) {
      basicUser.organization_working_details = user.activeOrganizations.map(
        organizationsUsersDto.toOrganizationsUsers,
      );
    }
    return basicUser;
  }

  // transform a request to a user like entity
  static toUserCreate(client_info) {
    return {
      name: client_info.clientName,
      email: client_info.clientEmail,
      clientId: client_info.clientId,
    };
  }
}

export default UserDTO;
