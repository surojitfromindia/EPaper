import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import {
  Invoice,
  InvoiceCreatable,
  InvoiceIdType,
} from "../../Models/Invoice/Invoices.model";
import sequelize from "../../Config/DataBase.Config";
import { InvoiceDao, InvoiceLineItemDao } from "../../DAO";
import { InvoiceLineCalculation } from "./InvoiceLineCalculation";
import { ToInvoiceUpdateType } from "../../DTO/Invoice.DTO";
import { ComparisonUtil } from "../../Utils/ComparisonUtil";
import { InvoiceUtil } from "./InvoiceUtil";
import { ValidityUtil } from "../../Utils/ValidityUtil";
import { ContactService } from "../Contact/Contact.service";
import { InvoiceJournalService } from "./InvoiceJournal.service";

type InvoiceUpdateProps = {
  invoice_details: ToInvoiceUpdateType;
  invoice_id: InvoiceIdType;
};

class InvoiceUpdateService {
  private readonly _clientInfo: ClientInfo;
  private readonly _organizationId: number;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._clientInfo = client_info;
    this._organizationId = client_info.organizationId;
  }

  async update({ invoice_details, invoice_id }: InvoiceUpdateProps) {
    const organizationId = this._organizationId;
    const invoiceId = invoice_id;
    const contactId = invoice_details.contactId;
    const issueDate = invoice_details.issueDate;
    // these values are replaceable
    let dueDate = invoice_details.dueDate;
    let paymentTermId = invoice_details.paymentTermId;
    let currencyId = invoice_details.currencyId;
    let invoicePaymentTermId: number | null = null;

    const oldInvoice = await InvoiceDao.getByIdWithLineItems({
      invoice_id: invoiceId,
      organization_id: organizationId,
    });

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
      const invoiceCalculation = await InvoiceLineCalculation.init({
        client_info: this._clientInfo,
        is_inclusive_tax: invoiceBody.isInclusiveTax,
        exchange_rate: invoiceBody.exchangeRate,
        line_items: allLineItems,
      });
      const invoiceCalculateReturn = invoiceCalculation.calculate();
      const newLineItems = invoiceCalculateReturn.line_items;

      // calculate due date
      if (ValidityUtil.isNotEmpty(paymentTermId)) {
        const { due_date, invoice_payment_term_id } =
          await InvoiceUtil.generateInvoicePaymentTermId(
            {
              payment_term_id: paymentTermId,
              issue_date: issueDate,
              custom_due_date: dueDate,
              organization_id: organizationId,
            },
            {
              transaction: t1,
            },
          );

        // update the due date and create a new invoicePaymentTerm
        dueDate = due_date;
        invoicePaymentTermId = invoice_payment_term_id;
      }

      // if currencyId is not present, get the currencyId from contact
      if (ValidityUtil.isEmpty(currencyId)) {
        const contactService = new ContactService({
          client_info: this._clientInfo,
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
        discountTotal: invoiceCalculateReturn.discountTotal,
        subTotal: invoiceCalculateReturn.subTotal,
        taxTotal: invoiceCalculateReturn.taxTotal,
        total: invoiceCalculateReturn.total,
        bcyDiscountTotal: invoiceCalculateReturn.bcyDiscountTotal,
        bcySubTotal: invoiceCalculateReturn.bcySubTotal,
        bcyTaxTotal: invoiceCalculateReturn.bcyTaxTotal,
        bcyTotal: invoiceCalculateReturn.bcyTotal,
        // todo: after customer payment is done we need to update this code as well.
        balance: invoiceCalculateReturn.total,
        bcyBalance: invoiceCalculateReturn.bcyTotal,
        paymentStatus: "not_paid",
      });

      // only a few line items will be updated, we separate them by identifying a key "id."
      // if id is present, then it is an update, otherwise it will be created.
      const updatableLineItems = ComparisonUtil.getEntriesOnlyInFirstArray({
        first_array: previousLineItems,
        second_array: newLineItems.filter((lineItem) => lineItem.id),
        key_for_second_array: "id",
        key_for_first_array: "id",
      }).map((lineItem) => ({
        ...lineItem,
        organizationId,
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
        organizationId,
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
      const updatedLineItems = await InvoiceLineItemDao.bulkUpdateByInvoiceId(
        {
          invoice_line_items: updatableLineItems,
        },
        { transaction: t1 },
      );

      // create the line items that are not in the invoice.
      const createdLineItems = await InvoiceLineItemDao.bulkCreate(
        {
          invoice_line_items: creatableLineItems,
        },
        {
          transaction: t1,
        },
      );

      // update
      const updateInvoice = await InvoiceDao.update(
        {
          invoice_id: invoiceId,
          organization_id: organizationId,
          invoice_details: invoiceBody,
        },
        {
          transaction: t1,
        },
      );

      // create journal entries
      const invoiceJournalService = new InvoiceJournalService({
        organization_id: organizationId,
      });
      const journalFactory =
        await invoiceJournalService.getCreatableCalculation({
          invoice_id: invoiceId,
          contact_id: contactId,
        });
      // if old invoice status is "draft" and new is "sent" we create the journal entries
      if (
        oldInvoice.transactionStatus === "draft" &&
        updateInvoice.transactionStatus === "sent"
      ) {
        if (oldInvoice.transactionStatus === "draft") {
          await journalFactory.create(
            {
              line_items: createdLineItems,
            },
            {
              transaction: t1,
            },
          );
        } else {
          await journalFactory.update(
            {
              invoice_id: invoiceId,
              line_items_id_to_delete: lineItemIdsToDelete,
              line_items_to_be_created: createdLineItems,
              line_items_to_be_updated: updatedLineItems,
            },
            {
              transaction: t1,
            },
          );
        }
      }

      // update the balance
      await this.#balanceUpdate(
        {
          update_invoice: updateInvoice,
          old_invoice: oldInvoice,
        },
        {
          transaction: t1,
        },
      );

      return updateInvoice;
    });
  }

  async #balanceUpdate({ update_invoice, old_invoice }, { transaction }) {
    const oldInvoice = old_invoice;
    const updateInvoice = update_invoice;
    const newCurrencyId = updateInvoice.currencyId;
    const oldCurrencyId = oldInvoice.currencyId;
    const newContactId = updateInvoice.contactId;
    const oldContactId = oldInvoice.contactId;
    const newTransactionStatus = updateInvoice.transactionStatus;
    const oldTransactionStatus = oldInvoice.transactionStatus;

    const contactService = new ContactService({
      client_info: this._clientInfo,
    });
    if (newTransactionStatus === "sent" && oldTransactionStatus === "draft") {
      await contactService.updateBalanceOnInvoiceNotPaid(
        {
          contact_id: newContactId,
          currency_id: newCurrencyId,
          new_invoice_amount: updateInvoice.total,
          old_invoice_amount: 0,
          new_invoice_amount_bcy: updateInvoice.bcyTotal,
          old_invoice_amount_bcy: 0,
        },
        {
          transaction,
        },
      );
    } else if (
      newTransactionStatus === "sent" &&
      oldTransactionStatus === "sent"
    ) {
      // we have two situations here.
      // if contact has changed, then we need to update the balance of the previous contact also
      // if contact has not changed, then we need to update the balance of the contact

      if (oldContactId !== newContactId) {
        // update the balance of the previous contact
        await contactService.updateBalanceOnInvoiceNotPaid(
          {
            contact_id: oldContactId,
            currency_id: oldCurrencyId,
            new_invoice_amount: 0,
            old_invoice_amount: oldInvoice.total,
            new_invoice_amount_bcy: 0,
            old_invoice_amount_bcy: oldInvoice.bcyTotal,
          },
          {
            transaction,
          },
        );
        // update the balance of the new contact
        await contactService.updateBalanceOnInvoiceNotPaid(
          {
            contact_id: newContactId,
            currency_id: newCurrencyId,
            new_invoice_amount: updateInvoice.total,
            old_invoice_amount: 0,
            new_invoice_amount_bcy: updateInvoice.bcyTotal,
            old_invoice_amount_bcy: 0,
          },
          {
            transaction,
          },
        );
      } else {
        await contactService.updateBalanceOnInvoiceNotPaid(
          {
            contact_id: newContactId,
            currency_id: newCurrencyId,
            new_invoice_amount: updateInvoice.total,
            old_invoice_amount: oldInvoice.total,
            new_invoice_amount_bcy: updateInvoice.bcyTotal,
            old_invoice_amount_bcy: oldInvoice.bcyTotal,
          },
          {
            transaction,
          },
        );
      }
    }
  }
}

export default InvoiceUpdateService;
