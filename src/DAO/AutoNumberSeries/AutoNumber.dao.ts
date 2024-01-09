import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { AutoNumbers } from "../../Models";

class AutoNumberDAO {
  private readonly _organization_id: OrganizationBasicIdType;

  constructor({ organization_id }) {
    this._organization_id = organization_id;
  }

  async bulkCreate({ auto_numbers }, { transaction }) {
    return await AutoNumbers.bulkCreate(auto_numbers, { transaction });
  }

  async bulkUpdate({ auto_numbers }, { transaction }) {
    return await AutoNumbers.bulkCreate(auto_numbers, { transaction });
  }
}

export { AutoNumberDAO };
