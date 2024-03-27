import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { ContactIdType } from "../../Models/Contact/Contacts.model";
import { AccountsTree } from "../../Utils/AccoutsTree";
import {
  AccountsOfOrganizationService,
  ContactService,
  CustomerPaymentPreferenceService,
  PaymentModeService,
} from "../index";

type CustomerPaymentGetEdiPageProps = {
  customer_payment_id?: number;
};

class CustomerPaymentEditPageService {
  private readonly _clientInfo: ClientInfo;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._clientInfo = client_info;
  }

  async getEditPage({ customer_payment_id }: CustomerPaymentGetEdiPageProps) {
    const client_info = this._clientInfo;
    let paymentDetails = null;
    let contact = null;

    // payment modes
    const paymentModeService = new PaymentModeService({
      client_info: this._clientInfo,
    });
    const paymentModes = await paymentModeService.getAll();

    // payment acccounts
    const { deposit_to_accounts } =
      await AccountsOfOrganizationService.ofCustomerPayment({
        client_info,
      }).getAccounts();

    // payment settings setting
    const paymentSettings = await this.#getEditPagePaymentSettings();

    return {
      payment_details: paymentDetails,
      payment_modes: paymentModes,
      contact,
      deposit_to_accounts_list:
        AccountsTree.createTreeOfOrganizationAccountsAsDTO({
          accounts: deposit_to_accounts,
        }).flatArrayFromTreeAsDTO(),
      payment_settings: paymentSettings,
    };
  }

  async getEditPageFromContact({ contact_id }: { contact_id: ContactIdType }) {
    const client_info = this._clientInfo;
    const contactService = new ContactService({ client_info });
    const contact = await contactService.getContactById({ contact_id });

    const other = await this.getEditPage({});
    return {
      ...other,
      contact,
    };
  }

  async #getEditPagePaymentSettings() {
    const preferenceService = new CustomerPaymentPreferenceService({
      client_info: this._clientInfo,
    });

    return await preferenceService.get();
  }
}

export { CustomerPaymentEditPageService };
