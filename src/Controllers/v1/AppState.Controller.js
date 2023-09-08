import { AppStateService } from "../../Services/index.js";
import { SuccessErrorWrapper } from "../../Utils/SuccessErrorWrapper.js";

let getAppState = async (req) => {
  const client_info = req.clientInfo;
  const appState = await AppStateService.getAppState({
    client_info,
  });
  return { app_state: appState };
};
getAppState = SuccessErrorWrapper(getAppState, 200);

export { getAppState };
