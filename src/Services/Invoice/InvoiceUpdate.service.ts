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
import { ValidityUtil } from "../../Utils/ValidityUtil";
import { ContactService } from "../Contact/Contact.service";

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
    const contactId = invoice_details.contactId;
    const issueDate = invoice_details.issueDate;

    // these values are replaceable
    let dueDate = invoice_details.dueDate;
    let paymentTermId = invoice_details.paymentTermId;
    let currencyId = invoice_details.currencyId;
    let invoicePaymentTermId: number | null = null;

    // new invoice body.
    const invoiceBody: InvoiceCreatable = {
      ...invoice_details,
      id: invoiceId,
      organizationId: organizationId,
    };

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
        client_info,
        invoice: invoiceBody,
        line_items: allLineItems,
      });
      const invoiceCalculateReturn = invoiceCalculation.calculate();
      const newLineItems = invoiceCalculateReturn.line_items;

      // calculate due date
      if (ValidityUtil.isNotEmpty(paymentTermId)) {
        const { due_date, payment_term_details: paymentTermDetails } =
          await InvoiceUtil.calculateDueDate({
            issue_date: DateUtil.parseFromStr(issueDate),
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
        dueDate = DateUtil.Formatter(due_date).format(DATE_FORMAT_DB);
        invoicePaymentTermId = createdInvoicePaymentTerm.id;
      }

      // if currencyId is not present, get the currencyId from contact
      if (ValidityUtil.isEmpty(currencyId)) {
        const contactService = new ContactService({
          client_info,
        });
        const contact = await contactService.getContactByIdRaw({
          contact_id: contactId,
        });
        currencyId = contact.currencyId;
      }

      Object.assign(invoiceBody, {
        dueDate,
        invoicePaymentTermId,
        currencyId,
        subTotal: invoiceCalculateReturn.subTotal,
        total: invoiceCalculateReturn.total,
        discountTotal: invoiceCalculateReturn.discountTotal,
        taxTotal: invoiceCalculateReturn.taxTotal,
      });

      // only a few line items will be updated, we separate them by identifying a key "id."
      // if id is present, then it is an update, otherwise it will be created.
      const updatableLineItems = ComparisonUtil.getEntriesOnlyInFirstArray({
        first_array: previousLineItems,
        second_array: newLineItems.filter((lineItem) => lineItem.id),
        key_for_second_array: "id",
        key_for_first_array: "id",
      }).map((lineItem) => ({
        ...newLineItems,
        organizationId: client_info.organizationId,
        invoiceId: invoiceId,
      }));

      // item that is not updatable will be created.
      const creatableLineItems = ComparisonUtil.getEntriesNotInFirstArray({
        first_array: updatableLineItems,
        second_array: newLineItems,
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
          invoice_details: invoiceBody,
        },
        {
          transaction: t1,
        },
      );
    });
  }
}

export default Object.freeze(new InvoiceUpdateService());
