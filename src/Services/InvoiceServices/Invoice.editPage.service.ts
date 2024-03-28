import {
  ItemUnitService,
  PaymentTermService,
  TaxRateService,
} from "../SettingServices/Setting.service";
import {
  AccountsOfOrganizationService,
  ContactService,
  InvoiceService,
} from "../index";
import { AccountsTree } from "../../Utils/AccoutsTree";
import { InvoiceIdType } from "../../Models/Invoice/Invoices.model";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { ContactIdType } from "../../Models/Contact/Contacts.model";
import { InvoicePreferenceService } from "../PreferenceServices/Preference.service";

type InvoiceGetEdiPageProps = {
  invoice_id?: InvoiceIdType;
};

class InvoiceEditPageService {
  private readonly clientInfo: ClientInfo;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this.clientInfo = client_info;
  }

  async getEditPage({ invoice_id }: InvoiceGetEdiPageProps) {
    const client_info = this.clientInfo;
    let invoiceDetails = null;
    let contact = null;

    // taxes
    const taxes = await TaxRateService.getAllTaxRates({
      client_info: this.clientInfo,
    });

    // units
    const itemUnits = await ItemUnitService.getAllItemUnits({
      client_info: this.clientInfo,
    });

    // payment terms
    const paymentTerms = await PaymentTermService.getAllPaymentTerms({
      client_info,
    });

    // line item accounts
    const { line_item_accounts_list } =
      await AccountsOfOrganizationService.ofInvoiceLineItem({
        client_info,
      }).getAccountsForInvoiceLineItem();

    // invoice setting
    const invoiceSettings = await this.#getEditPageInvoiceSettings();

    // the invoice details
    if (invoice_id) {
      const invoiceService = new InvoiceService({
        client_info,
      });
      invoiceDetails = await invoiceService.getAnInvoice(
        {
          invoice_id,
        },
        {
          include_line_items: true,
        },
      );
      const contactService = new ContactService({
        client_info,
      });
      contact = await contactService.getContactById({
        contact_id: invoiceDetails.contactId,
      });
    }
    return {
      invoice_details: invoiceDetails,
      contact,
      taxes,
      units: itemUnits,
      payment_terms: paymentTerms,
      line_item_accounts_list:
        AccountsTree.createTreeOfOrganizationAccountsAsDTO({
          accounts: line_item_accounts_list,
        }).flatArrayFromTreeAsDTO(),
      invoice_settings: invoiceSettings,
    };
  }

  async getEditPageFromContact({ contact_id }: { contact_id: ContactIdType }) {
    const client_info = this.clientInfo;
    const contactService = new ContactService({ client_info });
    const contact = await contactService.getContactById({ contact_id });

    const other = await this.getEditPage({});
    return {
      ...other,
      contact,
    };
  }

  async #getEditPageInvoiceSettings() {
    const invoicePreferenceService = new InvoicePreferenceService({
      client_info: this.clientInfo,
    });

    return await invoicePreferenceService.get();
  }
}

export { InvoiceEditPageService };
