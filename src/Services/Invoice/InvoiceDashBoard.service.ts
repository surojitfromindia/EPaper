import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { InvoiceDashboardDAO } from "../../DAO";

class InvoiceDashboardService {
  private readonly _organizationId: number;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._organizationId = client_info.organizationId;
  }

  async getInvoiceDashboardData() {
    const organizationId = this._organizationId;
    const invoiceDao = new InvoiceDashboardDAO({
      organization_id: organizationId,
    });
    return await invoiceDao.getDueOverview();
  }
}

export { InvoiceDashboardService };
