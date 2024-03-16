import { InvoiceJournalModel } from "../../Models";
import { InvoiceJournalCreatableRequired } from "../../Models/Invoice/InvoiceJournal.model";
import { Op, Transaction } from "@sequelize/core";

interface InvoiceJournalBulkCreateProps {
  journal_line: InvoiceJournalCreatableRequired[];
}

interface InvoiceJournalBulkCreateOptions {
  transaction: Transaction;
}

interface InvoiceJournalBulkDeleteByLineItemIdsProps {
  line_item_ids: number[];
}

interface InvoiceJournalBulkDeleteByLineItemIdsOptions {
  transaction: Transaction;
}

interface InvoiceJournalBulkDeleteByLineItemIdAndSlugsProps {
  id_and_slugs: {
    line_item_id: number;
    account_slugs: string[];
  }[];
}

interface InvoiceJournalBulkDeleteByLineItemIdAndSlugsOptions {
  transaction: Transaction;
}

interface InvoiceJournalGetByInvoiceIdProps {
  invoice_id: number;
}

interface InvoiceJournalBulkUpdateByInvoiceIdProps {
  journal_lines: InvoiceJournalCreatableRequired[];
}

interface InvoiceJournalBulkUpdateByInvoiceIdOptions {
  transaction: Transaction;
}

interface InvoiceJournalBulkDeleteByInvoiceIdProps {
  invoice_id: number;
}

interface InvoiceJournalBulkDeleteByInvoiceIdOptions {
  transaction: Transaction;
}

class InvoiceJournalDAO {
  private readonly organization_id: number;

  constructor({ organization_id }: { organization_id: number }) {
    this.organization_id = organization_id;
  }

  async bulkCreate(
    { journal_line }: InvoiceJournalBulkCreateProps,
    { transaction }: InvoiceJournalBulkCreateOptions,
  ) {
    return await InvoiceJournalModel.bulkCreate(journal_line, {
      transaction,
    });
  }

  async bulkDeleteByLineItemIds(
    { line_item_ids }: InvoiceJournalBulkDeleteByLineItemIdsProps,
    { transaction }: InvoiceJournalBulkDeleteByLineItemIdsOptions,
  ) {
    return await InvoiceJournalModel.update(
      {
        status: "deleted",
        syncStatus: "notSynced",
      },
      {
        where: {
          lineItemId: line_item_ids,
          organizationId: this.organization_id,
        },
        transaction,
      },
    );
  }

  async bulkDeleteByLineItemIdAndSlugs(
    { id_and_slugs }: InvoiceJournalBulkDeleteByLineItemIdAndSlugsProps,
    { transaction }: InvoiceJournalBulkDeleteByLineItemIdAndSlugsOptions,
  ) {
    return await InvoiceJournalModel.update(
      {
        status: "deleted",
        syncStatus: "notSynced",
      },
      {
        where: {
          organizationId: this.organization_id,
          [Op.or]: id_and_slugs.map((id_and_slug) => ({
            lineItemId: id_and_slug.line_item_id,
            accountSlug: id_and_slug.account_slugs,
          })),
        },
        transaction,
      },
    );
  }

  async getByInvoiceId({ invoice_id }: InvoiceJournalGetByInvoiceIdProps) {
    return await InvoiceJournalModel.findAll({
      where: {
        invoiceId: invoice_id,
        organizationId: this.organization_id,
        status: "active",
      },
    });
  }

  async bulkUpdateByInvoice(
    { journal_lines }: InvoiceJournalBulkUpdateByInvoiceIdProps,
    { transaction }: InvoiceJournalBulkUpdateByInvoiceIdOptions,
  ) {
    return await InvoiceJournalModel.bulkCreate(journal_lines, {
      updateOnDuplicate: [
        "bcyCredit",
        "bcyDebit",
        "debit",
        "credit",
        "accountId",
      ],
      transaction,
    });
  }

  async bulkDeleteByInvoiceId(
    { invoice_id }: InvoiceJournalBulkDeleteByInvoiceIdProps,
    { transaction }: InvoiceJournalBulkDeleteByInvoiceIdOptions,
  ) {
    return await InvoiceJournalModel.update(
      {
        status: "deleted",
        syncStatus: "notSynced",
      },
      {
        where: {
          status: "active",
          invoiceId: invoice_id,
          organizationId: this.organization_id,
        },
        transaction,
      },
    );
  }
}

export { InvoiceJournalDAO };
