// I want to access the database from here in unit call

import {OrganizationBasic, OrganizationsUsers, User} from "../Models/index.js";

class UserDao {
    async create({user}, {transaction}) {
        return await User.create(user, {transaction: transaction});
    }

    async getAll() {
        return await User.findAll({});
    }

    async getAnUserWithOrganization({user_id}) {
        return User.findByPk(user_id, {
            include: [
                {
                    model: OrganizationsUsers, as: "activeOrganizations",
                    where: {
                        status: "active"
                    },
                    include: [
                        {
                            model: OrganizationBasic,
                            as: "organizationBasic",
                        }
                    ]
                }
            ]
        })
    }
}

export default Object.freeze(new UserDao());
