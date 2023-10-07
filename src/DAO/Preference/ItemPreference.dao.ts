import { ItemPreference } from "../../Models";

class ItemPreferenceDao {
  async create({ preference_details }, { transaction }) {
    return await ItemPreference.create(preference_details, {
      transaction,
    });
  }

  async get({ organization_id }) {
    return await ItemPreference.findOne({
      where: {
        organizationId: organization_id,
      },
    });
  }
}

export default Object.freeze(new ItemPreferenceDao());
