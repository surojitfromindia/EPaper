import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { AutoNumberGroups, AutoNumbers } from "../../Models";

class AutoNumberGroupDAO {
  private organization_id: OrganizationBasicIdType;

  constructor({ organization_id }) {
    this.organization_id = organization_id;
  }

  async create({ auto_number_group }, { transaction }) {
    return await AutoNumberGroups.create(auto_number_group, { transaction });
  }

  async get({ auto_number_group_id }, { transaction }) {
    return await AutoNumberGroups.findOne({
      where: {
        id: auto_number_group_id,
        organizationId: this.organization_id,
        status: "active",
      },
      include: [
        {
          model: AutoNumbers,
          as: "AutoNumbers",
        },
      ],
      transaction,
    });
  }

  async update({ auto_number_group_id, auto_number_group }, { transaction }) {
    await AutoNumberGroups.update(auto_number_group, {
      where: {
        id: auto_number_group_id,
        organizationId: this.organization_id,
      },
      transaction,
    });
    return await this.get({ auto_number_group_id }, { transaction });
  }

  async delete({ auto_number_group_id }, { transaction }) {
    return await AutoNumberGroups.update(
      {
        status: "deleted",
      },
      {
        where: {
          id: auto_number_group_id,
          organizationId: this.organization_id,
        },
        transaction,
      },
    );
  }

  async getAll({ transaction }) {
    return await AutoNumberGroups.findAll({
      where: {
        organizationId: this.organization_id,
        status: "active",
      },
      include: [
        {
          model: AutoNumbers,
          as: "AutoNumbers",
        },
      ],
      transaction,
    });
  }
}

export { AutoNumberGroupDAO };
