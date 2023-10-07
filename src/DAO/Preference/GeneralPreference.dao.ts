import { GeneralPreference } from "../../Models";

class GeneralPreferenceDao {
  async create({ preference_details }, { transaction }) {
    return await GeneralPreference.create(preference_details, {
      transaction,
    });
  }

  async get({ organization_id }) {
    return await GeneralPreference.findOne({
      where: {
        organizationId: organization_id,
      },
    });
  }
}

export default Object.freeze(new GeneralPreferenceDao());
