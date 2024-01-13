import {
  ItemUnitService,
  PaymentTermService,
  TaxRateService,
} from "../SettingServices/Setting.service";
import {
  AccountsOfOrganizationService,
  AutoNumberSeriesService,
  ContactService,
  InvoiceService,
} from "../index";
import { AccountsTree } from "../../Utils/AccoutsTree";
import { InvoiceIdType } from "../../Models/Invoice/Invoices.model";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { ContactIdType } from "../../Models/Contact/Contacts.model";

type InvoiceGetEdiPageProps = {
  invoice_id: InvoiceIdType;
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
      invoiceDetails = await InvoiceService.getAnInvoice({
        invoice_id,
        client_info,
      });
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
    // todo: have different taxes
    // todo: have different payment modes
    const client_info = this.clientInfo;
    const contactService = new ContactService({ client_info });
    const contact = await contactService.getContactById({ contact_id });
    return {
      contact,
    };
  }

  async #getEditPageInvoiceSettings() {
    const autoNumberSeriesService = new AutoNumberSeriesService({
      client_info: this.clientInfo,
    });
    const autoNumberGroups =
      await autoNumberSeriesService.getAutoNumberGroupsOfEntity({
        entity_type: "invoice",
      });
    const defaultAutoNumberGroup = autoNumberGroups.find((gp) => gp.isDefault);
    return {
      auto_number_groups: autoNumberGroups,
      default_auto_number_group: defaultAutoNumberGroup,
    };
  }
}

export { InvoiceEditPageService };
