// i want to access the database from here in unit call

import {OrganizationBasic, User} from '../Models/index.js';

class OrganizationDao {
    async create({organization_details}) {
        const organization_basic = await OrganizationBasic.create(organization_details);
        return await OrganizationBasic.findByPk(organization_basic.get("id"), {
            include: [{model: User, as: "createdByUser"}]
        });
    }

    async getAll() {
        return await OrganizationBasic.findAll({
            include: [{
                model: User,
                as: "createdByUser"
            }]
        });
    }
}

export default Object.freeze(new OrganizationDao());
