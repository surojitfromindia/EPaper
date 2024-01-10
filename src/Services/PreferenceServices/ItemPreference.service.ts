import { PREFERENCE_DEFAULTS } from "../../Constants/Preference.Constant";
import { ItemPreferenceDAO } from "../../DAO";
import { PreferenceNotFoundError } from "../../Errors/APIErrors/index";

class ItemPreferenceService {
  async create({ organization_id }, { transaction }) {
    const itemPreference = PREFERENCE_DEFAULTS.ITEM_PREFERENCE;
    const newItemPreference = {
      ...itemPreference,
      organizationId: organization_id,
    };
    await ItemPreferenceDAO.create(
      {
        preference_details: newItemPreference,
      },
      { transaction },
    );
    return true;
  }

  async get({ client_info }) {
    const organizationId = client_info.organizationId;
    const preference = await ItemPreferenceDAO.get({
      organization_id: organizationId,
    });
    if (preference) {
      return preference;
    }
    throw new PreferenceNotFoundError();
  }
}

export default Object.freeze(new ItemPreferenceService());
