import { ItemUnitDao } from "../../DAO/index";
import { UNITS_DEFAULTS } from "../../Constants/ItemUnits.Constant";
import sequelize from "../../Config/DataBase.Config";

class ItemUnitService {
  async getAllItemUnits({ client_info }) {
    const organizationId = client_info.organizationId;
    return await ItemUnitDao.getAll({
      organization_id: organizationId,
    });
  }

  async getItemUnitByUnit({ client_info, unit }) {
    const organizationId = client_info.organizationId;
    return await ItemUnitDao.getByUnit({
      organization_id: organizationId,
      unit,
    });
  }

  async initDefaultItemUnits(
    { client_info, organization_id, organization_country_code },
    { transaction },
  ) {
    const organizationId = organization_id;
    const userId = client_info.userId;
    let itemUnits =
      UNITS_DEFAULTS[organization_country_code] ?? UNITS_DEFAULTS._OTHER_;
    if (itemUnits) {
      itemUnits = itemUnits.map((unit: any) => ({
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

  async create({ client_info, item_unit_details }) {
    return await sequelize.transaction(async (t1) => {
      return this.createWithTransaction(
        { client_info, item_unit_details },
        { transaction: t1 },
      );
    });
  }

  async createWithTransaction(
    { client_info, item_unit_details },
    { transaction },
  ) {
    item_unit_details.organizationId = client_info.organizationId;
    item_unit_details.createdBy = client_info.userId;
    return ItemUnitDao.create(
      {
        item_unit_details,
      },
      { transaction },
    );
  }
}

export default Object.freeze(new ItemUnitService());
