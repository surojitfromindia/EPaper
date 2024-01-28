// I want to access the database from here in unit call

import { OrganizationBasic, OrganizationsUsers } from "../Models";

class OrganizationsUsersDao {
  async create({ organization_user_details }, { transaction }) {
    return await OrganizationsUsers.create(organization_user_details, {
      transaction,
    });
  }

  async getAllOrganizationOfUser({ user_id }) {
    return await OrganizationsUsers.findAll({
      where: { userId: user_id, status: "active" },
      include: [
        {
          model: OrganizationBasic,
          as: "Organization",
          required: true,
        },
      ],
    });
  }
}

export default Object.freeze(new OrganizationsUsersDao());
