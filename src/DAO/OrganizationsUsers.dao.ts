// I want to access the database from here in unit call

import { OrganizationsUsers } from "../Models";

class OrganizationsUsersDao {
  async create({ organization_user_details }, { transaction }) {
    return await OrganizationsUsers.create(organization_user_details, {
      transaction,
    });
  }

  async getAll() {
    return await OrganizationsUsers.findAll();
  }
}

export default Object.freeze(new OrganizationsUsersDao());
