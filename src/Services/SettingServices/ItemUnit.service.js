import { ItemUnitDao } from "../../DAO/index.js";
import { UNITS_DEFAULTS } from "../../Constants/ItemUnits.Constant.js";

class ItemUnitService {
  async getAllItemUnits({ client_info }) {
    const organizationId = client_info.organizationId;
    return await ItemUnitDao.getAll({
      organization_id: organizationId,
    });
  }

  async initDefaultItemUnits(
    { client_info, organization_id, organization_country_code },
    { transaction },
  ) {
    const organizationId = organization_id;
    const userId = client_info.userId;
    let itemUnits = UNITS_DEFAULTS._OTHER_;
    const countryItemUnits = UNITS_DEFAULTS[organization_country_code];
    if (countryItemUnits) {
      itemUnits = countryItemUnits.map((unit) => ({
        ...unit,
        organizationId,
        createdBy: userId,
      }));
    }
    return await ItemUnitDao.createAll(
      {
        item_units_details: itemUnits,
      },
      { transaction },
    );
  }
}

export default Object.freeze(new ItemUnitService());
