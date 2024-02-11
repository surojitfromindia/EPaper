import { CustomViewPreferenceService } from "../../Services";
import { Request } from "express";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { CustomViewDTO } from "../../DTO";

const getFullCustomView = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const customViewService = new CustomViewPreferenceService({
    client_info: clientInfo,
  });

  const cv = await customViewService.getCustomView();
  return { custom_view: CustomViewDTO.toFullCustomView(cv) };
};

const getFullCustomViewController = SuccessErrorWrapper(
  getFullCustomView,
  "done",
  200,
);
export { getFullCustomViewController };
