import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { AutoNumberGroups, AutoNumbers } from "../../Models";
import { IAutoNumberEntityTypes } from "../../Models/AutoNumberSeries/AutoNumber.model";

const AUTO_NUMBER_GRP_STATUS = "active";
class AutoNumberGroupDAO {
  private readonly organization_id: OrganizationBasicIdType;

  constructor({ organization_id }) {
    this.organization_id = organization_id;
  }

  async create({ auto_number_group }, { transaction }) {
    return await AutoNumberGroups.create(auto_number_group, { transaction });
  }

  async get({ auto_number_group_id }) {
    return await AutoNumberGroups.findOne({
      where: {
        id: auto_number_group_id,
        organizationId: this.organization_id,
        status: AUTO_NUMBER_GRP_STATUS,
      },
      include: [
        {
          model: AutoNumbers,
          as: "AutoNumbers",
        },
      ],
    });
  }

  async update({ auto_number_group_id, auto_number_group }, { transaction }) {
    await AutoNumberGroups.update(auto_number_group, {
      where: {
        id: auto_number_group_id,
        organizationId: this.organization_id,
        status: AUTO_NUMBER_GRP_STATUS,
      },
      transaction,
    });
    return await this.get({ auto_number_group_id });
  }

  async getAll() {
    return await AutoNumberGroups.findAll({
      where: {
        organizationId: this.organization_id,
        status: AUTO_NUMBER_GRP_STATUS,
      },
      include: [
        {
          model: AutoNumbers,
          as: "AutoNumbers",
        },
      ],
    });
  }

  async getOfEntity({ entity_type }: { entity_type: IAutoNumberEntityTypes }) {
    return await AutoNumberGroups.findAll({
      where: {
        organizationId: this.organization_id,
        status: AUTO_NUMBER_GRP_STATUS,
      },
      include: [
        {
          model: AutoNumbers,
          as: "AutoNumbers",
          where: {
            entityType: entity_type,
          },
        },
      ],
    });
  }
}

export { AutoNumberGroupDAO };
