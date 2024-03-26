import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";

class CustomerPaymentEditPageService {
  private readonly _clientInfo: ClientInfo;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._clientInfo = client_info;
  }
}
