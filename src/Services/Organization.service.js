// here I handle business logic
import {OrganizationDao, OrganizationsUsersDao} from '../DAO/index.js';
import {OrganizationDTO} from '../DTO/index.js';


class OrganizationService {

    async registerOrganization({organization_details, client_info}) {
        const createdBy = client_info.userId;
        const new_organization = OrganizationDTO.toOrganizationCreate(organization_details, createdBy);
        const created_organization = await OrganizationDao.create({organization_details: new_organization});
        // after creating an organization, check if the client has any previous organization,
        // if not, we are setting this organization as default for this client.
        const isFirstOrganization = client_info.userOrganizations.length === 0;

        // save organization-user association, this user will be considered as admin
        await OrganizationsUsersDao.create({
            organization_user_details: {
                jobStatus: "working",
                status: "active",
                userId: createdBy,
                roleId: 'admin',
                organizationId: created_organization.get("id"),
                isDefaultOrganization: isFirstOrganization ? true : null, // we are saving this fields as a three-column composite key
            }
        })
        return OrganizationDTO.toOrganizationDTO(created_organization);
    }

}

export default Object.freeze(new OrganizationService());
