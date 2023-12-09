import { CurrencyModel, OrganizationBasic, User } from "../Models";
import {
  OrganizationBasicCreatable,
  OrganizationBasicIdType,
} from "../Models/Organization/Organization.model";
import { Transaction } from "@sequelize/core";

class OrganizationDao {
  async create(
    {
      organization_details,
    }: {
      organization_details: OrganizationBasicCreatable;
    },
    {
      transaction,
    }: {
      transaction: Transaction;
    },
  ) {
    const organization_basic = await OrganizationBasic.create(
      organization_details,
      { transaction },
    );
    return await OrganizationBasic.findByPk(organization_basic.get("id"), {
      include: [{ model: User, as: "createdByUser" }],
      transaction,
    });
  }

  async getOrganizationByIdRaw({
    organization_id,
  }: {
    organization_id: OrganizationBasicIdType;
  }) {
    return await OrganizationBasic.findByPk(organization_id, {});
  }

  async getOrganizationById({
    organization_id,
  }: {
    organization_id: OrganizationBasicIdType;
  }) {
    return await OrganizationBasic.findByPk(organization_id, {
      include: [{ model: CurrencyModel, as: "Currency" }],
    });
  }
}

export default Object.freeze(new OrganizationDao());
