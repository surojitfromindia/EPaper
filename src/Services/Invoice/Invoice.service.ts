import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import {
  InvoiceCreatable,
  InvoiceIdType,
} from "../../Models/Invoice/Invoices.model";
import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import sequelize from "../../Config/DataBase.Config";
import { InvoiceDao, InvoiceLineItemDao } from "../../DAO";
import { DataNotFoundError } from "../../Errors/APIErrors";
import { InvoiceCalculation } from "./InvoiceCalculation";
import {
  ItemUnitService,
  TaxRateService,
} from "../SettingServices/Setting.service";
import { AccountsOfOrganizationService } from "../index";
import { AccountsTree } from "../../Utils/AccoutsTree";
import { ToInvoiceCreateType } from "../../DTO/Invoice.dto";

type InvoiceCreateProps = {
  invoice_details: ToInvoiceCreateType;
  client_info: ClientInfo;
};

type InvoiceGetProps = {
  invoice_id: InvoiceIdType;
  client_info: ClientInfo;
};

type InvoiceGetEdiPageProps = {
  invoice_id: InvoiceIdType;
  client_info: ClientInfo;
};

class InvoiceService {
  async create({ client_info, invoice_details }: InvoiceCreateProps) {
    const invoiceBody: InvoiceCreatable = {
      organizationId: client_info.organizationId,
      createdBy: client_info.userId,
      ...invoice_details,
    };
    const lineItems = invoice_details.lineItems;
    const lineItemsBody: InvoiceLineItemCreatable[] = lineItems.map(
      (lineItem) => ({
        organizationId: client_info.organizationId,
        ...lineItem,
      }),
    );
    return await sequelize.transaction(async (t1) => {
      const invoiceCalculation = await InvoiceCalculation.init({
        invoice: invoiceBody,
        client_info,
        line_items: lineItemsBody,
      });
      const { invoice: newInvoice, line_items: newLineItems } =
        invoiceCalculation.calculate();

      const createdInvoice = await InvoiceDao.create(
        {
          invoice_details: newInvoice,
        },
        {
          transaction: t1,
        },
      );
      const invoiceId = createdInvoice.id;
      const newLineItemsWithInvoiceId = newLineItems.map((lineItem) =>
        Object.assign(lineItem, { invoiceId }),
      );
      await InvoiceLineItemDao.bulkCreate(
        {
          invoice_line_items: newLineItemsWithInvoiceId,
        },
        {
          transaction: t1,
        },
      );
      return await this.getAnInvoice({ invoice_id: invoiceId, client_info });
    });
  }

  async getAnInvoice({ invoice_id, client_info }: InvoiceGetProps) {
    const organizationId = client_info.organizationId;
    const invoice = await InvoiceDao.getByIdWithLineItems({
      invoice_id,
      organization_id: organizationId,
    });
    if (invoice) {
      return invoice;
    }
    throw new DataNotFoundError();
  }

  async getEditPage({ client_info, invoice_id }: InvoiceGetEdiPageProps) {
    const taxes = await TaxRateService.getAllTaxRates({ client_info });
    const itemUnits = await ItemUnitService.getAllItemUnits({ client_info });
    const { line_item_accounts_list } =
      await AccountsOfOrganizationService.ofInvoiceLineItem({
        client_info,
      }).getAccountsForInvoiceLineItem();
    return {
      taxes,
      units: itemUnits,
      line_item_accounts_list:
        AccountsTree.createTreeOfOrganizationAccountsAsDTO({
          accounts: line_item_accounts_list,
        }).flatArrayFromTreeAsDTO(),
    };
  }
}

export default Object.freeze(new InvoiceService());
