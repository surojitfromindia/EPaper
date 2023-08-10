import {TaxRateService} from "../../../Services/index.js";


const create = async (req, res) => {
    const body = req.body;
    const userId = 1;
    const organizationId = 1;
    const createTaxRate = await TaxRateService.create({
        tax_rate_details: body,
        user_id: userId,
        organization_id: organizationId
    });
    res.status(201).json({tax_rate: createTaxRate});
}

const getAllTaxRates = async (req, res) => {
    const organizationId = 1;
    const tax_rates = await TaxRateService.getAllTaxRates({organization_id: organizationId});
    res.status(200).json({tax_rates});
}
const getATaxRate = async (req, res) => {
    const taxRateId = req.params.taxRateId;
    const organizationId = 1;
    const tax_rate = await TaxRateService.getATaxRate({tax_rate_id: taxRateId, organization_id: organizationId});
    res.status(200).json({tax_rate})
}

export {
    create,
    getAllTaxRates,
    getATaxRate
}