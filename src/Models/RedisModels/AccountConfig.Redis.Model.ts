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

export { AccountConfigRedisModel };
