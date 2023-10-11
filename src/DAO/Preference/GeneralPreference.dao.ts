import { GeneralPreferenceModel } from "../../Models";

class GeneralPreferenceDao {
  async create({ preference_details }, { transaction }) {
    return await GeneralPreferenceModel.create(preference_details, {
      transaction,
    });
  }

  async get({ organization_id }) {
    return await GeneralPreferenceModel.findOne({
      where: {
        organizationId: organization_id,
      },
    });
  }
}

export default Object.freeze(new GeneralPreferenceDao());
