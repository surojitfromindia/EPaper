import { OrganizationDTO, UserDTO } from "./index";

class OrganizationsUsersDTO {
  /**
   *
   * @param {OrganizationUserDetailsType} organization_user
   * @return {OrganizationUserDetailsTypeAsDTO}
   */
  static toOrganizationsUsers(organization_user) {
    const return_dto = {
      id: organization_user.id,
      organization_id: organization_user.organizationId,
      user_id: organization_user.userId,
      job_status: organization_user.jobStatus,
      role_id: organization_user.roleId,
      status: organization_user.status,
      invited_by: organization_user.invitedBy,
      invited_on: organization_user.invitedOn,
      accepted_on: organization_user.acceptedOn,
    };
    if (organization_user.isDefaultOrganization === true) {
      return_dto.is_default_organization = true;
    }
    if (organization_user.user) {
      return_dto.user = UserDTO.toUser(organization_user.user);
    }
    if (organization_user.organizationBasic) {
      return_dto.organization = OrganizationDTO.toOrganization(
        organization_user.organizationBasic,
      );
    }
    return return_dto;
  }
}

export default OrganizationsUsersDTO;
