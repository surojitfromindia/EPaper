import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { FeaturesPreferenceModel } from "../../Models";

class FeaturesPreferenceDAO {
  private _organizationId: OrganizationBasicIdType;

  constructor({ organization_id }) {
    this._organizationId = organization_id;
  }

  static async create({ preference_details }, { transaction }) {
    return await FeaturesPreferenceModel.create(preference_details, {
      transaction,
    });
  }
}

export { FeaturesPreferenceDAO };
