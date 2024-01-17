import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { AutoNumbersModel } from "../../Models";

class AutoNumberDAO {
  private readonly _organization_id: OrganizationBasicIdType;

  constructor({ organization_id }) {
    this._organization_id = organization_id;
  }
  async bulkCreate({ auto_numbers }, { transaction }) {
    return await AutoNumbersModel.bulkCreate(auto_numbers, { transaction });
  }

  async update({ auto_number_id, auto_number_details }, { transaction }) {
    return await AutoNumbersModel.update(auto_number_details, {
      where: { id: auto_number_id },
    });
  }
}

export { AutoNumberDAO };
