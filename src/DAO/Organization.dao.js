// i want to access the database from here in unit call

import {OrganizationBasicModel, UserModel} from '../Models/index.js';

class OrganizationDao {
  async create({organization_details}) {
    const organization_basic = await OrganizationBasicModel.create(organization_details);
    return await OrganizationBasicModel.findByPk(organization_basic.get("id"), {
      include: [UserModel]
    });
  }

  async getAll() {
    return await OrganizationBasicModel.findAll({
      include: {
        model: [UserModel],
      }
    });
  }
}

export default Object.freeze(new OrganizationDao());
