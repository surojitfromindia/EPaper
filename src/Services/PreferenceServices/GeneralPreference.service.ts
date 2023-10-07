import { PREFERENCE_DEFAULTS } from "../../Constants/Preference.Constant";
import { GeneralPreferenceDao } from "../../DAO/index";
import { PreferenceNotFoundError } from "../../Errors/APIErrors/index";

class GeneralPreferenceService {
  async create({ organization_id }, { transaction }) {
    const generalPreference = PREFERENCE_DEFAULTS.GENERAL_PREFERENCE;
    generalPreference["organizationId"] = organization_id;
    await GeneralPreferenceDao.create(
      {
        preference_details: generalPreference,
      },
      { transaction },
    );
    return true;
  }

  async get({ client_info }) {
    const organizationId = client_info.organizationId;
    const preference = await GeneralPreferenceDao.get({
      organization_id: organizationId,
    });
    if (preference) {
      return preference;
    }
    throw new PreferenceNotFoundError();
  }
}

export default Object.freeze(new GeneralPreferenceService());
