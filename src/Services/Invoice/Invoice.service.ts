import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import {
  Invoice,
  InvoiceCreatable,
  InvoiceIdType,
} from "../../Models/Invoice/Invoices.model";
import { InvoiceLineItemCreatable } from "../../Models/Invoice/InvoiceLineItems.model";
import sequelize from "../../Config/DataBase.Config";
import {
  InvoiceDao,
  InvoiceLineItemDao,
  InvoicePaymentTermDao,
  PaymentTermDao,
} from "../../DAO";
import { DataNotFoundError } from "../../Errors/APIErrors";
import { InvoiceCalculation } from "./InvoiceCalculation";
import {
  ItemUnitService,
  PaymentTermService,
  TaxRateService,
} from "../SettingServices/Setting.service";
import { AccountsOfOrganizationService } from "../index";
import { AccountsTree } from "../../Utils/AccoutsTree";
import { ToInvoiceCreateType } from "../../DTO/Invoice.dto";
import { ComparisonUtil } from "../../Utils/ComparisonUtil";
import { DateUtil } from "../../Utils/DateUtil";
import { DATE_FORMAT_DB } from "../../Constants/DateFormat.Constant";

type InvoiceCreateProps = {
  invoice_details: ToInvoiceCreateType;
  client_info: ClientInfo;
};
type InvoiceUpdateProps = {
  invoice_details: ToInvoiceCreateType;
  client_info: ClientInfo;
  invoice_id: InvoiceIdType;
};

type InvoiceGetProps = {
  invoice_id: InvoiceIdType;
  client_info: ClientInfo;
};

type InvoiceGetEdiPageProps = {
  invoice_id: InvoiceIdType;
  client_info: ClientInfo;
};

type CalculateDueDateProps = {
  issue_date: Date;
  payment_term_id: number;
  organization_id: number;
};

class InvoiceService {
  async create({ client_info, invoice_details }: InvoiceCreateProps) {
    const organizationId = client_info.organizationId;
    const userId = client_info.userId;

    // invoice and line items
    const invoiceBody = {
      ...invoice_details,
      organizationId,
      createdBy: userId,
    };
    const paymentTermId = invoice_details.paymentTermId;

    // line items
    const lineItemsBody: InvoiceLineItemCreatable[] = invoice_details.lineItems;

    return await sequelize.transaction(async (t1) => {
      const invoiceCalculation = await InvoiceCalculation.init({
        client_info,
        invoice: invoiceBody,
        line_items: lineItemsBody,
      });
      const { invoice: newInvoice, line_items: newLineItems } =
        invoiceCalculation.calculate();

      // calculate due date
      if (paymentTermId) {
        const { due_date: dueDate, payment_term_details: paymentTermDetails } =
          await InvoiceUtil.calculateDueDate({
            issue_date: DateUtil.parseFromStr(newInvoice.issueDate),
            payment_term_id: paymentTermId,
            organization_id: organizationId,
          });

        // create the invoicePaymentTerm if paymentTermId is present
        const createdInvoicePaymentTerm =
          await InvoiceUtil.createInvoicePaymentTerm(
            {
              payment_term_details: paymentTermDetails,
            },
            {
              transaction: t1,
            },
          );

        // update the due date and create a new invoicePaymentTerm
        newInvoice.dueDate = DateUtil.Formatter(dueDate).format(DATE_FORMAT_DB);
        newInvoice.invoicePaymentTermId = createdInvoicePaymentTerm.id;
      }

      // create the invoice
      const createdInvoice = await InvoiceDao.create(
        {
          invoice_details: newInvoice,
        },
        {
          transaction: t1,
        },
      );
      const invoiceId = createdInvoice.id;

      // create the line items with invoice id
      const newLineItemsWithInvoiceId = newLineItems.map((lineItem) =>
        Object.assign(lineItem, {
          invoiceId,
          organizationId,
        }),
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
    const paymentTerms = await PaymentTermService.getAllPaymentTerms({
      client_info,
    });
    const { line_item_accounts_list } =
      await AccountsOfOrganizationService.ofInvoiceLineItem({
        client_info,
      }).getAccountsForInvoiceLineItem();
    return {
      taxes,
      units: itemUnits,
      payment_terms: paymentTerms,
      line_item_accounts_list:
        AccountsTree.createTreeOfOrganizationAccountsAsDTO({
          accounts: line_item_accounts_list,
        }).flatArrayFromTreeAsDTO(),
    };
  }

  async update({
    client_info,
    invoice_details,
    invoice_id,
  }: InvoiceUpdateProps) {
    const organizationId = client_info.organizationId;
    const invoiceId = invoice_id;

    // new invoice body.
    const invoiceBody: InvoiceCreatable = {
      ...invoice_details,
      id: invoiceId,
      organizationId: organizationId,
      createdBy: client_info.userId,
    };
    const paymentTermId = invoice_details.paymentTermId;

    // all line items.
    const allLineItems = invoice_details.lineItems;

    // previous line items.
    const previousLineItems = await InvoiceLineItemDao.getByInvoiceId({
      organization_id: organizationId,
      invoice_id: invoiceId,
    });

    // missing line items will be deleted
    const lineItemIdsToDelete = ComparisonUtil.getEntriesNotInFirstArray({
      first_array: allLineItems,
      second_array: previousLineItems,
      key_for_second_array: "id",
      key_for_first_array: "id",
    }).map((lineItem) => lineItem.id);

    return await sequelize.transaction(async (t1): Promise<Invoice> => {
      // do the calculation
      const invoiceCalculation = await InvoiceCalculation.init({
        invoice: invoiceBody,
        client_info,
        line_items: allLineItems,
      });
      const { invoice: updateInvoice, line_items } =
        invoiceCalculation.calculate();

      // calculate due date
      if (paymentTermId) {
        const { due_date: dueDate, payment_term_details: paymentTermDetails } =
          await InvoiceUtil.calculateDueDate({
            issue_date: DateUtil.parseFromStr(updateInvoice.issueDate),
            payment_term_id: paymentTermId,
            organization_id: organizationId,
          });

        // create the invoicePaymentTerm if paymentTermId is present
        const createdInvoicePaymentTerm =
          await InvoiceUtil.createInvoicePaymentTerm(
            {
              payment_term_details: paymentTermDetails,
            },
            {
              transaction: t1,
            },
          );

        // update the due date and create a new invoicePaymentTerm
        updateInvoice.dueDate =
          DateUtil.Formatter(dueDate).format(DATE_FORMAT_DB);
        updateInvoice.invoicePaymentTermId = createdInvoicePaymentTerm.id;
      }

      // only a few line items will be updated, we separate them by identifying a key "id."
      // if id is present, then it is an update, otherwise it will be created.
      const updatableLineItems = ComparisonUtil.getEntriesOnlyInFirstArray({
        first_array: previousLineItems,
        second_array: line_items.filter((lineItem) => lineItem.id),
        key_for_second_array: "id",
        key_for_first_array: "id",
      }).map((lineItem) => ({
        ...lineItem,
        organizationId: client_info.organizationId,
        invoiceId: invoiceId,
      }));

      // item that is not updatable will be created.
      const creatableLineItems = ComparisonUtil.getEntriesNotInFirstArray({
        first_array: updatableLineItems,
        second_array: line_items,
        key_for_first_array: "id",
        key_for_second_array: "id",
      }).map((lineItem) => ({
        ...lineItem,
        organizationId: client_info.organizationId,
        invoiceId: invoiceId,
        id: null, // any item that is not updatable will be created. so here we set id to null (in case a falsy value is passed)
      }));

      // delete the line items that are not in the invoice.
      await InvoiceLineItemDao.bulkDeleteByInvoiceId(
        {
          invoice_id: invoiceId,
          organization_id: organizationId,
          line_item_ids: lineItemIdsToDelete,
        },
        { transaction: t1 },
      );

      // update the line items that are in the invoice.
      await InvoiceLineItemDao.bulkUpdateByInvoiceId(
        {
          invoice_line_items: updatableLineItems,
        },
        { transaction: t1 },
      );

      // create the line items that are not in the invoice.
      await InvoiceLineItemDao.bulkCreate(
        {
          invoice_line_items: creatableLineItems,
        },
        {
          transaction: t1,
        },
      );

      // update
      return await InvoiceDao.update(
        {
          invoice_id: invoiceId,
          organization_id: organizationId,
          invoice_details: updateInvoice,
        },
        {
          transaction: t1,
        },
      );
    });
  }
}

export default Object.freeze(new InvoiceService());

class InvoiceUtil {
  static async calculateDueDate({
    issue_date,
    payment_term_id,
    organization_id,
  }: CalculateDueDateProps) {
    const paymentTerm = await PaymentTermDao.get({
      payment_term_id,
      organization_id,
    });
    // depending to "interval" type if regular just use regular calculation
    const interval = paymentTerm.interval;
    const pt = paymentTerm.paymentTerm;
    const dateCalculator = DateUtil.Calculator(issue_date);
    let date: Date;
    switch (interval) {
      case "regular": {
        date = dateCalculator.addDays(pt).getDate();
        break;
      }
      case "end_of_month": {
        date = dateCalculator.endOfFewMonths(pt).getDate();
        break;
      }
      case "end_of_day": {
        date = dateCalculator.endOfCurrentDay().getDate();
        break;
      }
    }
    return { due_date: date, payment_term_details: paymentTerm };
  }

  static async createInvoicePaymentTerm(
    { payment_term_details },
    { transaction },
  ) {
    return await InvoicePaymentTermDao.create(
      {
        term_details: {
          originPaymentTermId: payment_term_details.id,
          name: payment_term_details.name,
          interval: payment_term_details.interval,
          paymentTerm: payment_term_details.paymentTerm,
        },
      },
      {
        transaction,
      },
    );
  }
}
