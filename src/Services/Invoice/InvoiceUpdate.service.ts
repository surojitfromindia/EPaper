import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import {
  Invoice,
  InvoiceCreatable,
  InvoiceIdType,
} from "../../Models/Invoice/Invoices.model";
import sequelize from "../../Config/DataBase.Config";
import { InvoiceDao, InvoiceLineItemDao } from "../../DAO";
import { InvoiceCalculation } from "./InvoiceCalculation";
import { ToInvoiceCreateType } from "../../DTO/Invoice.dto";
import { ComparisonUtil } from "../../Utils/ComparisonUtil";
import { DateUtil } from "../../Utils/DateUtil";
import { DATE_FORMAT_DB } from "../../Constants/DateFormat.Constant";
import { InvoiceUtil } from "./InvoiceUtil";

type InvoiceUpdateProps = {
  invoice_details: ToInvoiceCreateType;
  client_info: ClientInfo;
  invoice_id: InvoiceIdType;
};

class InvoiceUpdateService {
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

export default Object.freeze(new InvoiceUpdateService());
