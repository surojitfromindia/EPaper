import { CustomViewDAO } from "../../MongodbDAO";
import { CUSTOM_VIEW } from "../../Constants/CustomView";

class CustomViewPreferenceService {
  private readonly _organizationId: number;
  private _customViewDAO: CustomViewDAO;

  constructor({ client_info }) {
    this._organizationId = client_info.organizationId;
    this._customViewDAO = new CustomViewDAO({
      organization_id: this._organizationId,
    });
  }

  static async createDefault({ organization_id }) {
    const customViewDAO = new CustomViewDAO({ organization_id });
    return await customViewDAO.createFullCustomView({
      custom_view: {
        organization_id,
        ...CUSTOM_VIEW,
      },
    });
  }

  async getCustomView() {
    return this._customViewDAO.getCustomView();
  }
}

export { CustomViewPreferenceService };
