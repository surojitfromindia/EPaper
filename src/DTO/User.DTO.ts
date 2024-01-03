import organizationsUsersDto from "./OrganizationsUsers.DTO";

type UserCreatePayload = {
  clientName: string;
  clientEmail: string;
  clientId: string;
};

type ToUserDTO = {
  name: string;
  user_id: number;
  email: string;
  user_organizations: any[];
};

class UserDTO {
  /**
   *
   * @param {any} user
   * @returns {UserDetailsTypeAsDTO}
   */
  static toUser(user: any): ToUserDTO {
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
  static toUserCreate(client_info: UserCreatePayload) {
    return {
      name: client_info.clientName,
      email: client_info.clientEmail,
      clientId: client_info.clientId,
    };
  }
}

export default UserDTO;
export type { UserCreatePayload, ToUserDTO };
