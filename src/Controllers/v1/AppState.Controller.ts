import { AppStateService } from "../../Services/index";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper";
import { Request } from "express";

const getAppState = async (req: Request) => {
  const client_info = req.clientInfo;
  const appState = await AppStateService.getAppState({
    client_info,
  });
  return { app_state: appState };
};
const getAppStateController = SuccessErrorWrapper(getAppState, "done", 200);

export { getAppStateController };
