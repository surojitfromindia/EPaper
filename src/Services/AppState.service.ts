import { OrganizationDao, UserDao } from "../DAO/index";
import AppStateDto from "../DTO/AppState.DTO";

class AppStateService {
  async getAppState({ client_info }) {
    const organizationId = client_info.organizationId;
    const userId = client_info.userId;
    const userDetails = await UserDao.getUserById({ user_id: userId });
    const organizationDetails = await OrganizationDao.getOrganizationById({
      organization_id: organizationId,
    });

    return AppStateDto.toAppState({
      userDetails,
      organizationDetails,
    });
  }
}

export default Object.freeze(new AppStateService());
