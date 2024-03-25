import { CustomerPaymentPreferencesModel } from "../../Models";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";

class CustomerPaymentPreferenceDAO {
  private readonly _organizationId: OrganizationBasicIdType;

  constructor({ organization_id }) {
    this._organizationId = organization_id;
  }

  async create({ preference_details }, { transaction }) {
    return await CustomerPaymentPreferencesModel.create(preference_details, {
      transaction,
    });
  }

  async get() {
    return await CustomerPaymentPreferencesModel.findOne({
      where: {
        organizationId: this._organizationId,
      },
    });
  }

  async update({ preference_details }, { transaction }) {
    return await CustomerPaymentPreferencesModel.update(preference_details, {
      where: {
        organizationId: this._organizationId,
      },
      transaction,
    });
  }
}

export { CustomerPaymentPreferenceDAO };
