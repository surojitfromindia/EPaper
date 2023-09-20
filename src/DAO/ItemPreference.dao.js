import { ItemPreference } from "../Models/index.js";

class ItemPreferenceDao {
  async create({ preference_details }, { transaction }) {
    return await ItemPreference.create(preference_details, {
      transaction,
    });
  }

  async get({ organization_id }, {}) {
    return await ItemPreference.get({
      where: {
        organizationId: organization_id,
      },
    });
  }
}

export default Object.freeze(new ItemPreferenceDao());
