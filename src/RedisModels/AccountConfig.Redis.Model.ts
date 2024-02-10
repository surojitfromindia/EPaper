import { Schema } from "redis-om";

const AccountConfigRedisModel = new Schema(
  "accountConfig",
  {
    defaultSalesAccountId: { type: "number" },
    defaultTaxAccountId: { type: "number" },
    organizationId: { type: "number" },
    defaultAccountsPayableAccountId: { type: "number" },
    defaultInventoryAccountId: { type: "number" },
    defaultCostOfGoodsSoldAccountId: { type: "number" },
    defaultBankAccountId: { type: "number" },
    defaultBadDebtAccountId: { type: "number" },
    defaultOpeningBalanceOffsetAccountId: { type: "number" },
    defaultRetainedEarningsAccountId: { type: "number" },
    defaultOpeningBalanceAdjustmentsAccountId: { type: "number" },
    defaultExchangeGainLossAccountId: { type: "number" },
    defaultUnearnedRevenueAccountId: { type: "number" },
    defaultAccountsReceivableAccountId: { type: "number" },
    defaultDiscountAccountId: { type: "number" },
    defaultPurchaseAccountId: { type: "number" },
    defaultPurchaseDiscountAccountId: { type: "number" },
  },
  {
    dataStructure: "JSON",
  },
);

type AccountConfigRedisType = {
  defaultSalesAccountId: number;
  defaultTaxAccountId: number;
  organizationId: number;
  defaultAccountsPayableAccountId: number;
  defaultInventoryAccountId: number;
  defaultCostOfGoodsSoldAccountId: number;
  defaultBankAccountId: number;
  defaultBadDebtAccountId: number;
  defaultOpeningBalanceOffsetAccountId: number;
  defaultRetainedEarningsAccountId: number;
  defaultOpeningBalanceAdjustmentsAccountId: number;
  defaultExchangeGainLossAccountId: number;
  defaultUnearnedRevenueAccountId: number;
  defaultAccountsReceivableAccountId: number;
  defaultDiscountAccountId: number;
  defaultPurchaseAccountId: number;
  defaultPurchaseDiscountAccountId: number;
};

export { AccountConfigRedisModel };
export type { AccountConfigRedisType };
