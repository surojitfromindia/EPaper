import ItemPreferenceService from "./ItemPreference.service";
import GeneralPreferenceService from "./GeneralPreference.service";
import { FeaturesPreferenceService } from "./FeaturesPreference.service";

class PreferenceService {
  async initAllDefaultPreferences({ organization_id }, { transaction }) {
    await ItemPreferenceService.create({ organization_id }, { transaction });
    await GeneralPreferenceService.create({ organization_id }, { transaction });
    await FeaturesPreferenceService.create(
      { organization_id },
      { transaction },
    );
    return true;
  }
}

export default Object.freeze(new PreferenceService());
export {
  ItemPreferenceService,
  GeneralPreferenceService,
  FeaturesPreferenceService,
};
