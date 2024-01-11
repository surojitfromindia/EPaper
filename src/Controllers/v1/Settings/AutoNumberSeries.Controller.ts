import { Request } from "express";
import { AutoNumberSeriesService } from "../../../Services";
import { SuccessErrorWrapper } from "../../../Utils/SuccessErrorWrapper";
import { AutoNumberSeriesDTO } from "../../../DTO";

const getAllAutoNumberGroups = async (req: Request) => {
  const clientInfo = req.clientInfo;
  const autoNumberGpService = new AutoNumberSeriesService({
    client_info: clientInfo,
  });
  const autoNumberGroups = await autoNumberGpService.getAllAutoNumberGroups();
  return {
    auto_number_groups: autoNumberGroups.map((entry) =>
      AutoNumberSeriesDTO.toAutoNumberSeries(entry),
    ),
  };
};
const getAllAutoNumberGroupsController = SuccessErrorWrapper(
  getAllAutoNumberGroups,
  "done",
  200,
);

export { getAllAutoNumberGroupsController };
