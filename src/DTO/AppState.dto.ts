import { OrganizationDTO, UserDTO } from "./index";

class AppStateDTO {
  /**
   * Transform an dao to app state response
   * @param {AppStateDetailsType} app_state
   * @returns {AppStateDetailsTypeDTO}
   * */
  static toAppState(app_state) {
    return {
      user: UserDTO.toUser(app_state.userDetails),
      organization: OrganizationDTO.toOrganization(
        app_state.organizationDetails,
      ),
    };
  }
}

export default AppStateDTO;
