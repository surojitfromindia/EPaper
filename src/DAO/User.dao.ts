// I want to access the database from here in unit call

import { OrganizationBasic, OrganizationsUsers, User } from "../Models";
import { UserCreatable, UserIdType } from "../Models/User/User.model";
import { Transaction } from "@sequelize/core";

class UserDao {
  async create(
    { user }: { user: UserCreatable },
    {
      transaction,
    }: {
      transaction: Transaction;
    },
  ) {
    return await User.create(user, { transaction: transaction });
  }

  async getAll() {
    return await User.findAll({});
  }

  async getUserById({ user_id }: { user_id: UserIdType }) {
    return this.#getUserById({ user_id, include_organization_details: false });
  }

  async getUserByIdWithOrganization({ user_id }: { user_id: UserIdType }) {
    return this.#getUserById({ user_id, include_organization_details: true });
  }

  async getUserByClientId({ client_id }: { client_id: string }) {
    return this.#getUserByClientId({
      client_id,
      include_organization_details: false,
    });
  }

  async getUserByClientIdWithOrganization({
    client_id,
  }: {
    client_id: string;
  }) {
    return this.#getUserByClientId({
      client_id,
      include_organization_details: true,
    });
  }

  // private methods
  async #getUserById({
    user_id,
    include_organization_details = false,
  }: {
    user_id: UserIdType;
    include_organization_details: boolean;
  }) {
    const include = [];
    if (include_organization_details) {
      include.push({
        required: false,
        model: OrganizationsUsers,
        as: "UserOrganizations",
        where: {
          status: "active",
        },
      });
    }
    return User.findByPk(user_id, {
      include: [
        {
          required: false,
          model: OrganizationsUsers,
          as: "UserOrganizations",
          where: {
            status: "active",
          },
          include: [
            {
              required: true,
              model: OrganizationBasic,
              as: "Organization",
            },
          ],
        },
      ],
    });
  }

  async #getUserByClientId({
    client_id,
    include_organization_details = false,
  }: {
    client_id: string;
    include_organization_details: boolean;
  }) {
    const include = [];
    if (include_organization_details) {
      include.push({
        required: false,
        model: OrganizationsUsers,
        as: "UserOrganizations",
        where: {
          status: "active",
        },
      });
    }
    return User.findOne({
      where: {
        clientId: client_id,
      },
      include,
    });
  }
}

export default Object.freeze(new UserDao());
