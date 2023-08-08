// here I handle business logic
import {OrganizationDao, OrganizationsUsersDao} from '../DAO/index.js';
import {OrganizationDTO} from '../DTO/index.js';


class OrganizationService {

    async registerOrganization({organization_details, user_id}) {
        const new_organization = OrganizationDTO.toOrganizationCreate(organization_details, user_id);
        const created_organization = await OrganizationDao.create({organization_details: new_organization});
        // save organization-user association, this user will be considered as admin
        await OrganizationsUsersDao.create({
            organization_user_details: {
                jobStatus: "working",
                status: "active",
                userId: user_id,
                roleId: 'admin',
                organizationId: created_organization.get("id")
            }
        })
        return OrganizationDTO.toOrganizationDTO(created_organization);
    }

    async getAllOrganizations() {
        const organizations = await OrganizationDao.getAll();
        return organizations.map(organization => OrganizationDTO.toOrganizationDTO(organization));
    }


}

export default Object.freeze(new OrganizationService());
