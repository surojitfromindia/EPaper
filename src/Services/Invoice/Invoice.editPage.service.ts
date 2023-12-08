import {
  ItemUnitService,
  PaymentTermService,
  TaxRateService,
} from "../SettingServices/Setting.service";
import { AccountsOfOrganizationService } from "../index";
import { AccountsTree } from "../../Utils/AccoutsTree";
import { InvoiceIdType } from "../../Models/Invoice/Invoices.model";
import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import invoiceService from "./Invoice.service";

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
    const taxes = await TaxRateService.getAllTaxRates({
      client_info: this.clientInfo,
    });
    const itemUnits = await ItemUnitService.getAllItemUnits({
      client_info: this.clientInfo,
    });
    const paymentTerms = await PaymentTermService.getAllPaymentTerms({
      client_info,
    });
    const { line_item_accounts_list } =
      await AccountsOfOrganizationService.ofInvoiceLineItem({
        client_info,
      }).getAccountsForInvoiceLineItem();
    if (invoice_id) {
      invoiceDetails = await invoiceService.getAnInvoice({
        invoice_id,
        client_info,
      });
    }
    return {
      invoice_details: invoiceDetails,
      taxes,
      units: itemUnits,
      payment_terms: paymentTerms,
      line_item_accounts_list:
        AccountsTree.createTreeOfOrganizationAccountsAsDTO({
          accounts: line_item_accounts_list,
        }).flatArrayFromTreeAsDTO(),
    };
  }
}

export { InvoiceEditPageService };
