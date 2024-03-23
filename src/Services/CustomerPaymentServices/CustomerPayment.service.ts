import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { CustomerPaymentDTO } from "../../DTO";

class CustomerPaymentService {
  private readonly _clientInfo: ClientInfo;
  private readonly _organizationId: number;
  private readonly _userId: number;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._clientInfo = client_info;
    this._organizationId = client_info.organizationId;
    this._userId = client_info.userId;
  }

  async create({ customer_payment_details }) {
    const newCustomerPayment = CustomerPaymentDTO.toCustomerPaymentCreate({
      customer_payment: customer_payment_details,
    });

    // for each of the invoices, we first must ensure we are not overpaying
    // for any invoice.  if there is an excess for an invoice, we save it
    // as unused credit in the payment

    console.log("customer_payment_details", newCustomerPayment);
    return customer_payment_details;
  }
}

export { CustomerPaymentService };
