import {AccountTemplateDetails} from '../Models/index.js';

class AccountTemplateDetailsDao {
    async create({template_details}, {transaction}) {
        const template = await AccountTemplateDetails.create(template_details, {
            transaction
        });
        return await AccountTemplateDetails.findByPk(template.get("id"),);
    }

    async get({template_id}) {
        return await AccountTemplateDetails.findByPk(template_id)
    }
}

export default Object.freeze(new AccountTemplateDetailsDao());
