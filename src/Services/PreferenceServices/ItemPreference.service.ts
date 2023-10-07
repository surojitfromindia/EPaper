import { PREFERENCE_DEFAULTS } from "../../Constants/Preference.Constant";
import { ItemPreferenceDao } from "../../DAO/index";
import { PreferenceNotFoundError } from "../../Errors/APIErrors/index";

class ItemPreferenceService {
  async create({ organization_id }, { transaction }) {
    const itemPreference = PREFERENCE_DEFAULTS.ITEM_PREFERENCE;
    const newItemPreference = {
      ...itemPreference,
      organizationId: organization_id,
    };
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
