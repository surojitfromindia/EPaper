// I want to access the database from here in unit call

import {OrganizationsUsers} from '../Models/index.js';

class OrganizationsUsersDao {
    async create({organization_user_details}) {
        return await OrganizationsUsers.create(organization_user_details, {});

    }

    async getAll() {
        return await OrganizationsUsers.findAll();
    }
}

export default Object.freeze(new OrganizationsUsersDao());
