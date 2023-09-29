import {
  AccountsOfOrganization,
  RegularItems,
  TaxRates,
} from "../Models/index.js";

class RegularItemDao {
  async create({ item_details }, { transaction }) {
    const item = await RegularItems.create(item_details, {
      transaction,
    });
    return await RegularItems.findByPk(item.get("id"));
  }

  async get({ item_id, organization_id }) {
    return await RegularItems.findOne({
      where: {
        id: item_id,
        organization_id,
        status: "active",
      },
      include: [
        {
          model: TaxRates,
          as: "Tax",
          required: true,
        },
        {
          model: AccountsOfOrganization,
          as: "SalesAccount",
          required: false,
        },
        {
          model: AccountsOfOrganization,
          as: "PurchaseAccount",
          required: false,
        },
      ],
    });
  }

  async getAll({ organization_id }) {
    return await RegularItems.findAll({
      where: {
        organization_id,
        status: "active",
      },
    });
  }

  async updateItemDetails(
    { item_details, item_id, organization_id },
    { transaction },
  ) {
    await RegularItems.update(item_details, {
      where: {
        id: item_id,
        organization_id,
        status: "active",
      },
      transaction,
    });
    return await this.get({ item_id, organization_id });
  }
}

export default Object.freeze(new RegularItemDao());
