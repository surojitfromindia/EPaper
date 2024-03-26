import { PAYMENT_MODES } from "../../Constants/PaymentModes.Constant";
import { PaymentModeDAO } from "../../DAO";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";

class PaymentModeService {
  private readonly _clientInfo: ClientInfo;
  private readonly _organizationId: number;
  private readonly _paymentModeDAO: PaymentModeDAO;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._clientInfo = client_info;
    this._organizationId = client_info.organizationId;
    this._paymentModeDAO = new PaymentModeDAO({
      organization_id: this._organizationId,
    });
  }

  async getAll() {
    return this._paymentModeDAO.getAll();
  }

  async initDefaultPaymentModes({ organization_id }, { transaction }) {
    const organizationId = organization_id;
    const userId = this._clientInfo.userId;
    const paymentModeDAO = new PaymentModeDAO({
      organization_id,
    });
    const paymentModes = PAYMENT_MODES.map((pm) => ({
      ...pm,
      organizationId,
      createdBy: userId,
    }));

    return await paymentModeDAO.createAll(
      {
        payment_modes: paymentModes,
      },
      { transaction },
    );
  }
}

export { PaymentModeService };
