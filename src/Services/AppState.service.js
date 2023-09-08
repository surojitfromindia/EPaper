import { OrganizationDao, UserDao } from "../DAO/index.js";
import AppStateDto from "../DTO/AppState.dto.js";

class AppStateService {
  async getAppState({ client_info }) {
    const organizationId = client_info.organizationId;
    const userId = client_info.userId;
    const userDetails = await UserDao.getUserById({ user_id: userId });
    const organizationDetails = await OrganizationDao.getById({
      organization_id: organizationId,
    });
    return AppStateDto.toAppState({
      userDetails,
      organizationDetails,
    });
  }
}

export default Object.freeze(new AppStateService());
