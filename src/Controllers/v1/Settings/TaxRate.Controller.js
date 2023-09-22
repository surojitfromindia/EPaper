import { TaxRateService } from "../../../Services/index.js";
import { SuccessErrorWrapper } from "../../../Utils/SuccessErrorWrapper.js";
import { TaxRateDTO } from "../../../DTO/index.js";
import TaxRateDto from "../../../DTO/TaxRate.dto.js";

let create = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const taxRateDetailsFromPayload = TaxRateDTO.toTaxRateCreate(body);
  const createdTaxRate = await TaxRateService.create({
    tax_rate_details: taxRateDetailsFromPayload,
    client_info: clientInfo,
  });
  return { tax_rate: TaxRateDTO.toTaxRate(createdTaxRate) };
};
create = SuccessErrorWrapper(create, "tax rate created", 201);

let getAllTaxRates = async (req) => {
  const clientInfo = req.clientInfo;
  const taxRates = await TaxRateService.getAllTaxRates({
    client_info: clientInfo,
  });
  return { tax_rates: taxRates.map((user) => TaxRateDTO.toTaxRate(user)) };
};
getAllTaxRates = SuccessErrorWrapper(getAllTaxRates, "done", 200);

let getATaxRate = async (req) => {
  const clientInfo = req.clientInfo;
  const taxRateId = req.params.taxRateId;
  const taxRate = await TaxRateService.getATaxRate({
    tax_rate_id: taxRateId,
    client_info: clientInfo,
  });
  return { tax_rate: TaxRateDto.toTaxRate(taxRate) };
};
getATaxRate = SuccessErrorWrapper(getATaxRate, "done", 200);

let updateATaxRate = async (req) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const taxRateId = req.params.taxRateId;
  const taxRateDetailsFromPayload = TaxRateDTO.toTaxRateUpdate(body);
  const updatedTaxRate = await TaxRateService.updateATaxRate({
    tax_rate_details: taxRateDetailsFromPayload,
    tax_rate_id: taxRateId,
    client_info: clientInfo,
  });
  return { tax_rate: TaxRateDto.toTaxRate(updatedTaxRate) };
};
updateATaxRate = SuccessErrorWrapper(updateATaxRate, "tax rate update", 204);

export { create, getAllTaxRates, getATaxRate, updateATaxRate };
