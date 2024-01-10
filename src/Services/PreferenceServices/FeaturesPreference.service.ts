import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { FeaturesPreferenceDAO } from "../../DAO";
import { PREFERENCE_DEFAULTS } from "../../Constants/Preference.Constant";

class FeaturesPreferenceService {
  private _clientInfo: ClientInfo;
  private _organizationId: OrganizationBasicIdType;

  constructor({ client_info }) {
    this._clientInfo = client_info;
    this._organizationId = client_info.organizationId;
  }

  static async create({ organization_id }, { transaction }) {
    const featuresPreference = PREFERENCE_DEFAULTS.FEATURES_PREFERENCE;
    featuresPreference["organizationId"] = organization_id;
    await FeaturesPreferenceDAO.create(
      {
        preference_details: featuresPreference,
      },
      { transaction },
    );
    return true;
  }
}

export { FeaturesPreferenceService };
