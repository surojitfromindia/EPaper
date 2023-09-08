import { OrganizationDTO, UserDTO } from "./index.js";

class AppStateDTO {
  /**
   * Transform an dao to app state response
   * @param {AppStateDetailsType} app_state
   * @returns {AppStateDetailsTypeDTO}
   * */
  static toAppState(app_state) {
    return {
      user_details: UserDTO.toUser(app_state.userDetails),
      organization_details: OrganizationDTO.toOrganization(
        app_state.organizationDetails,
      ),
    };
  }
}

export default AppStateDTO;