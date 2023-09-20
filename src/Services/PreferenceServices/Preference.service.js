import ItemPreferenceService from "./ItemPreference.service.js";

class PreferenceService {
  async initAllDefaultPreferences({ organization_id }, { transaction }) {
    await ItemPreferenceService.create({ organization_id }, { transaction });
    return true;
  }
}

export default Object.freeze(new PreferenceService());
export { ItemPreferenceService };
