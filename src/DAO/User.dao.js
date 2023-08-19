// I want to access the database from here in unit call

import {OrganizationsUsers, User} from "../Models/index.js";

class UserDao {
    async create({user}, {transaction}) {
        return await User.create(user, {transaction: transaction});
    }

    async getAll() {
        return await User.findAll({});
    }


    async getUserById({user_id}) {
        return this.#getUserById({user_id, include_organization_details: false})
    }

    async getUserByIdWithOrganization({user_id}) {
        return this.#getUserById({user_id, include_organization_details: true})
    }


    async getUserByClientId({client_id}) {
        return this.#getUserByClientId({client_id, include_organization_details: false})
    }

    async getUserByClientIdWithOrganization({client_id}) {
        return this.#getUserByClientId({client_id, include_organization_details: true})
    }


    // private methods
    async #getUserById({user_id, include_organization_details = false}) {
        const include = [];
        if (include_organization_details) {
            include.push({
                required: false,
                model: OrganizationsUsers, as: "activeOrganizations",
                where: {
                    status: "active"
                },
            })
        }
        return User.findByPk(user_id, {
            include
        })
    }

    async #getUserByClientId({client_id, include_organization_details = false}) {
        const include = [];
        if (include_organization_details) {
            include.push({
                required: false,
                model: OrganizationsUsers, as: "activeOrganizations",
                where: {
                    status: "active"
                },
            })
        }
        return User.findOne({
            where: {
                clientId: client_id
            },
            include
        })
    }
}

export default Object.freeze(new UserDao());
