import organizationsUsersDto from "./OrganizationsUsers.dto";

class UserDTO {
  /**
   *
   * @param {any} user
   * @returns {UserDetailsTypeAsDTO}
   */
  static toUser(user: any) {
    const basicUser = {
      name: user.name,
      user_id: user.id,
      email: user.email,
      user_organizations: [],
    };

    if (user.UserOrganizations?.length > 0) {
      basicUser.user_organizations = user.UserOrganizations.map(
        organizationsUsersDto.toOrganizationsUsers,
      );
    }
    return basicUser;
  }

  // transform a request to a user like entity
  static toUserCreate(client_info: any) {
    return {
      name: client_info.clientName,
      email: client_info.clientEmail,
      clientId: client_info.clientId,
    };
  }
}

export default UserDTO;
