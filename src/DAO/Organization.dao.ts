import { OrganizationBasic, User } from "../Models";

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

  async getById({ organization_id }) {
    return await OrganizationBasic.findByPk(organization_id, {});
  }
}

export default Object.freeze(new OrganizationDao());
