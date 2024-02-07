import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";

import {
  ContactService,
  CurrencyService,
  PaymentTermService,
  TaxRateService,
} from "../index";
import { ContactIdType } from "../../Models/Contact/Contacts.model";

type ContactGetEdiPageProps = {
  contact_id: ContactIdType;
};

class ContactEditPageService {
  private readonly clientInfo: ClientInfo;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this.clientInfo = client_info;
  }

  async getEditPage({ contact_id }: ContactGetEdiPageProps) {
    const client_info = this.clientInfo;
    let contact = null;

    const paymentTerms = await PaymentTermService.getAllPaymentTerms({
      client_info,
    });
    const taxes = await TaxRateService.getAllTaxRates({
      client_info: this.clientInfo,
    });

    const currencyService = new CurrencyService({
      client_info,
    });
    const currencies = await currencyService.getAllCurrencies();

    if (contact_id) {
      const contactService = new ContactService({
        client_info,
      });
      contact = await contactService.getContactById({
        contact_id,
      });
    }
    return {
      contact,
      currencies,
      taxes,
      payment_terms: paymentTerms,
    };
  }
}

export { ContactEditPageService };
