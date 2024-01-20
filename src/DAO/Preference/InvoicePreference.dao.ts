import { InvoicePreferencesModel } from "../../Models";
import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";

class InvoicePreferenceDAO {
  private readonly _organizationId: OrganizationBasicIdType;

  constructor({ organization_id }) {
    this._organizationId = organization_id;
  }

  async create({ preference_details }, { transaction }) {
    return await InvoicePreferencesModel.create(preference_details, {
      transaction,
    });
  }

  async get() {
    return await InvoicePreferencesModel.findOne({
      where: {
        organizationId: this._organizationId,
      },
    });
  }

  async update({ preference_details }, { transaction }) {
    return await InvoicePreferencesModel.update(preference_details, {
      where: {
        organizationId: this._organizationId,
      },
      transaction,
    });
  }
}

export { InvoicePreferenceDAO };
