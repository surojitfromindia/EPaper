import { OrganizationBasic, User } from "../Models/index.js";

class OrganizationDao {
  async create({ organization_details }, { transaction }) {
    const organization_basic = await OrganizationBasic.create(
      organization_details,
      { transaction },
    );
    return await OrganizationBasic.findByPk(organization_basic.get("id"), {
      include: [{ model: User, as: "createdByUser" }],
      transaction,
    });
  }

  async getAll() {
    return await OrganizationBasic.findAll({
      include: [
        {
          model: User,
          as: "createdByUser",
        },
      ],
    });
  }
}

export default Object.freeze(new OrganizationDao());
