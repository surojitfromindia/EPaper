import ItemPreferenceService from "./ItemPreference.service";
import GeneralPreferenceService from "./GeneralPreference.service";
import { FeaturesPreferenceService } from "./FeaturesPreference.service";
import { InvoicePreferenceService } from "./InvoicePreference.service";
import { CustomViewPreferenceService } from "./CustomViewPreference.service";

class PreferenceService {
  async initAllDefaultPreferences({ organization_id }, { transaction }) {
    await ItemPreferenceService.create({ organization_id }, { transaction });
    await GeneralPreferenceService.create({ organization_id }, { transaction });
    await FeaturesPreferenceService.create(
      { organization_id },
      { transaction },
    );
    await InvoicePreferenceService.create(
      {
        organization_id,
      },
      {
        transaction,
      },
    );
    await CustomViewPreferenceService.createDefault({ organization_id });
    return true;
  }
}

export default Object.freeze(new PreferenceService());
export {
  ItemPreferenceService,
  GeneralPreferenceService,
  FeaturesPreferenceService,
  InvoicePreferenceService,
  CustomViewPreferenceService,
};
