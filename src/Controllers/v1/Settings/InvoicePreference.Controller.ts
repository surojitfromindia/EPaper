import { InvoicePreferenceService } from "../../../Services";
import { Request } from "express";
import { InvoiceSettingsDTO } from "../../../DTO/Invoice.DTO";
import { SuccessErrorWrapper } from "../../../Utils/SuccessErrorWrapper";

const updateInvoiceAutoNumber = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const body = req.body;
  const updatePayload = InvoiceSettingsDTO.toAutoNumberUpdatePayload({
    update_payload: body,
  });
  const invoicePreferenceService = new InvoicePreferenceService({
    client_info: clientInfo,
  });
  const updatedPreference = await invoicePreferenceService.updateAutoNumber({
    update_payload: updatePayload,
  });
  return {
    invoice_settings: InvoiceSettingsDTO.toEditPageInvoiceSettings({
      invoice_settings: updatedPreference,
    }),
  };
};
const updateInvoiceAutoNumberController = SuccessErrorWrapper(
  updateInvoiceAutoNumber,
  "invoice auto number preference updated",
  200,
);

export { updateInvoiceAutoNumberController };
