import {AccountsTemplateService} from "../../Services/index.js";


const createAccountOfTemplate = async (req, res) => {
    const body = req.body;
    const account = await AccountsTemplateService.create({account_details: body,});
    res.status(201).json({account});
}

// const getAllOrganizations = async (req, res) => {
//     const organizations = await OrganizationService.getAllOrganizations();
//     res.status(200).json({organizations});
// }

export {
    createAccountOfTemplate,
    // getAllOrganizations
} 