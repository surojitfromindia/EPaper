import ItemUnitService from "./ItemUnit.service";
import TaxRateService from "./TaxRate.service";

class SettingService {
  async initAllDefaultSettings(
    { client_info, organization_id, organization_country_code },
    { transaction },
  ) {
    await ItemUnitService.initDefaultItemUnits(
      { organization_id, client_info, organization_country_code },
      { transaction },
    );
    await TaxRateService.initDefaultTaxRates(
      { organization_id, client_info, organization_country_code },
      { transaction },
    );
    return true;
  }
}

export default Object.freeze(new SettingService());
export { ItemUnitService, TaxRateService };
