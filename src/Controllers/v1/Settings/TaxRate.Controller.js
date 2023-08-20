import { TaxRateService } from "../../../Services/index.js";
import { SuccessErrorWrapper } from "../../../Utils/SuccessErrorWrapper.js";

let create = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const createTaxRate = await TaxRateService.create({
    tax_rate_details: body,
    client_info: clientInfo,
  });
  return { tax_rate: createTaxRate };
};
create = SuccessErrorWrapper(create, 201);

let getAllTaxRates = async (req) => {
  const clientInfo = req.clientInfo;
  const tax_rates = await TaxRateService.getAllTaxRates({
    client_info: clientInfo,
  });
  return { tax_rates };
};
getAllTaxRates = SuccessErrorWrapper(getAllTaxRates, 200);

let getATaxRate = async (req) => {
  const clientInfo = req.clientInfo;
  const taxRateId = req.params.taxRateId;
  const tax_rate = await TaxRateService.getATaxRate({
    tax_rate_id: taxRateId,
    client_info: clientInfo,
  });
  return { tax_rate };
};
getATaxRate = SuccessErrorWrapper(getATaxRate, 200);

let updateATaxRate = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const taxRateId = req.params.taxRateId;
  const updatedTaxRate = await TaxRateService.updateATaxRate({
    tax_rate_details: body,
    tax_rate_id: taxRateId,
    client_info: clientInfo,
  });
  return { tax_rate: updatedTaxRate };
};
updateATaxRate = SuccessErrorWrapper(updateATaxRate, 204);

export { create, getAllTaxRates, getATaxRate, updateATaxRate };
