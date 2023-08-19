import {AccountTemplateDetails} from '../Models/index.js';

class AccountTemplateDetailsDao {
    async create({template_details}, {transaction}) {
        const template = await AccountTemplateDetails.create(template_details, {
            transaction
        });
        return await AccountTemplateDetails.findByPk(template.get("id"),);
    }

    async get({template_id, organization_id}) {
        return await AccountTemplateDetails.findOne({
            where: {
                id: template_id,
                organizationId: organization_id
            }
        })
    }
}

export default Object.freeze(new AccountTemplateDetailsDao());
