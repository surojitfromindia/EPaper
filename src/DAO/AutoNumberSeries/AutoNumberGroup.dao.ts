import { OrganizationBasicIdType } from "../../Models/Organization/Organization.model";
import { AutoNumberGroups, AutoNumbers } from "../../Models";
import { IAutoNumberEntityTypes } from "../../Models/AutoNumberSeries/AutoNumber.model";
import {
  IAutoNumberGroup,
  IAutoNumberGroupCreationAttributes,
} from "../../Models/AutoNumberSeries/AutoNumberGroup.model";
import { Transaction } from "@sequelize/core";

const AUTO_NUMBER_GRP_STATUS = "active";

type AutoNumberGroupCreateParams = {
  auto_number_group: IAutoNumberGroupCreationAttributes;
};
type AutoNumberGroupCreateParamsOptional = {
  transaction: Transaction;
};

type AutoNumberGroupUpdateParams = {
  auto_number_group_id: number;
  auto_number_group: IAutoNumberGroup;
  param1: {
    transaction: Transaction;
  };
};
type AutoNumberGroupUpdateParamsOptional = {
  transaction: Transaction;
};

type AutoNumberGroupGetParams = {
  auto_number_group_id: number;
};

type AutoNumberGroupGetAFoEntityParams = {
  entity_type: IAutoNumberEntityTypes;
};

class AutoNumberGroupDAO {
  private readonly organization_id: OrganizationBasicIdType;

  constructor({ organization_id }) {
    this.organization_id = organization_id;
  }

  async create(
    create_params: AutoNumberGroupCreateParams,
    options: AutoNumberGroupCreateParamsOptional,
  ) {
    const { auto_number_group } = create_params;
    const { transaction } = options || {};

    return await AutoNumberGroups.create(auto_number_group, { transaction });
  }

  /**
   * Get an auto number group
   */
  async get(get_params: AutoNumberGroupGetParams) {
    const { auto_number_group_id } = get_params;
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

  /**
   * Update auto number group
   */
  async update(
    update_params: AutoNumberGroupUpdateParams,
    options: AutoNumberGroupUpdateParamsOptional,
  ) {
    const { auto_number_group_id, auto_number_group } = update_params;
    const { transaction } = options || {};

    const {} = await AutoNumberGroups.update(auto_number_group, {
      where: {
        id: auto_number_group_id,
        organizationId: this.organization_id,
        status: AUTO_NUMBER_GRP_STATUS,
      },
      transaction,
    });
    return await this.get({ auto_number_group_id });
  }

  /**
   * Get all auto number groups
   */
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

  /**
   * Get all auto number groups of a particular entity type
   */
  async getOfEntity(get_params: AutoNumberGroupGetAFoEntityParams) {
    const { entity_type } = get_params;
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
