import { ClientInfo } from "../../Middlewares/Authorization/Authorization.middleware";
import { InvoiceDashboardDAO } from "../../DAO";
import { OrganizationService } from "../index";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { CurrencyType } from "../../Models/Currency/Currency.model";

type InvoiceDashboardData = {
  due_today: number;
  due_within_30_days: number;
  total_overdue: number;
  total_outstanding: number;
  Currency: CurrencyType;
};

class InvoiceDashboardService {
  private readonly _organizationId: number;

  constructor({ client_info }: { client_info: ClientInfo }) {
    this._organizationId = client_info.organizationId;
  }

  async getInvoiceDashboardData(): Promise<InvoiceDashboardData> {
    const organizationId = this._organizationId;
    const invoiceDao = new InvoiceDashboardDAO({
      organization_id: organizationId,
    });
    const data = await invoiceDao.getDueOverview();
    // get currency of organ
    const organizationService = new OrganizationService();
    const organization = await organizationService.getOrganizationById({
      organization_id: organizationId,
    });
    return {
      due_today: MathLib.parseNumber(data.due_today),
      due_within_30_days: MathLib.parseNumber(data.due_within_30_days),
      total_overdue: MathLib.parseNumber(data.total_overdue),
      total_outstanding: MathLib.parseNumber(data.total_outstanding),
      Currency: organization.Currency,
    };
  }
}

export { InvoiceDashboardService };
export type { InvoiceDashboardData };
