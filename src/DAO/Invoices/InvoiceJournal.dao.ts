import { InvoiceJournalModel } from "../../Models";

class InvoiceJournalDAO {
  private readonly organization_id: number;

  constructor({ organization_id }: { organization_id: number }) {
    this.organization_id = organization_id;
  }

  async bulkCreate({ journal_line }, { transaction }) {
    return await InvoiceJournalModel.bulkCreate(journal_line, {
      transaction,
    });
  }
}

export { InvoiceJournalDAO };
