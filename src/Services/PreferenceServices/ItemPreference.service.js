import { PREFERENCE_DEFAULTS } from "../../Constants/Preference.Constant.js";
import { ItemPreferenceDao } from "../../DAO/index.js";
import { PreferenceNotFoundError } from "../../Errors/APIErrors/index.js";

class ItemPreferenceService {
  async create({ organization_id }, { transaction }) {
    const itemPreference = PREFERENCE_DEFAULTS.ITEM_PREFERENCE;
    itemPreference.organizationId = organization_id;
    await ItemPreferenceDao.create(
      {
        preference_details: itemPreference,
      },
      { transaction },
    );
    return true;
  }

  async get({ client_info }) {
    const organizationId = client_info.organizationId;
    const preference = await ItemPreferenceDao.get({
      organization_id: organizationId,
    });
    if (preference) {
      return preference;
    }
    throw new PreferenceNotFoundError();
  }
}

export default Object.freeze(new ItemPreferenceService());
