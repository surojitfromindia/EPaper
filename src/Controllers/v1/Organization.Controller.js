import {OrganizationService} from "../../Services/index.js";


const registerOrganization = async (req, res) => {
    const body = req.body;
    const user_id = 1;
    const organization = await OrganizationService.registerOrganization({organization_details: body, user_id});
    res.status(201).json({organization});
}

const getAllOrganizations = async (req, res) => {
    const organizations = await OrganizationService.getAllOrganizations();
    res.status(200).json({organizations});
}

export {
    registerOrganization,
    getAllOrganizations
} 