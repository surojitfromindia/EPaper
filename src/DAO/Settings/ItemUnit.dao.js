import { ItemUnit } from "../../Models/index.js";

class ItemUnitDao {
  async create({ item_unit_details }, { transaction }) {
    const itemUnit = await ItemUnit.create(item_unit_details, {
      transaction,
    });
    return await ItemUnit.findByPk(itemUnit.get("id"));
  }

  async getAll({ organization_id }) {
    return await ItemUnit.findAll({
      where: {
        organization_id,
      },
      raw: false,
    });
  }

  async createAll({ item_units_details }, { transaction }) {
    return await ItemUnit.bulkCreate(item_units_details, {
      transaction,
    });
  }
}

export default Object.freeze(new ItemUnitDao());
