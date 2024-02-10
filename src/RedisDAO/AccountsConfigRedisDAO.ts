import { Repository } from "redis-om";
import {
  AccountConfigRedisModel,
  AccountConfigRedisType,
} from "../RedisModels/AccountConfig.Redis.Model";
import redis from "../Config/Redis.Config";
import { AccountsConfigDao } from "../DAO";

const AccountConfigRedisRepository = new Repository(
  AccountConfigRedisModel,
  redis,
);

class AccountsConfigRedisDAO {
  async save(account_config: any) {
    const organizationId = account_config.organizationId;
    const accountConfig = {
      organizationId,
      defaultSalesAccountId: account_config.defaultSalesAccountId,
      defaultTaxAccountId: account_config.defaultTaxAccountId,
      defaultAccountsPayableAccountId:
        account_config.defaultAccountsPayableAccountId,
      defaultInventoryAccountId: account_config.defaultInventoryAccountId,
      defaultCostOfGoodsSoldAccountId:
        account_config.defaultCostOfGoodsSoldAccountId,
      defaultBankAccountId: account_config.defaultBankAccountId,
      defaultBadDebtAccountId: account_config.defaultBadDebtAccountId,
      defaultOpeningBalanceOffsetAccountId:
        account_config.defaultOpeningBalanceOffsetAccountId,
      defaultRetainedEarningsAccountId:
        account_config.defaultRetainedEarningsAccountId,
      defaultOpeningBalanceAdjustmentsAccountId:
        account_config.defaultOpeningBalanceAdjustmentsAccountId,
      defaultExchangeGainLossAccountId:
        account_config.defaultExchangeGainLossAccountId,
      defaultUnearnedRevenueAccountId:
        account_config.defaultUnearnedRevenueAccountId,
      defaultAccountsReceivableAccountId:
        account_config.defaultAccountsReceivableAccountId,
      defaultDiscountAccountId: account_config.defaultDiscountAccountId,
      defaultPurchaseAccountId: account_config.defaultPurchaseAccountId,
      defaultPurchaseDiscountAccountId:
        account_config.defaultPurchaseDiscountAccountId,
    };
    await AccountConfigRedisRepository.save(
      organizationId.toString(),
      accountConfig,
    );
  }

  async get(organizationId: number): Promise<AccountConfigRedisType> {
    // try to fetch from redis first, if run the save method
    const b = await AccountConfigRedisRepository.fetch(
      organizationId.toString(),
    );
    if (b) {
      return b as AccountConfigRedisType;
    }
    const accountConfig = await AccountsConfigDao.get({
      organization_id: organizationId,
    });
    await this.save(accountConfig);
    return this.get(organizationId);
  }
}

export { AccountsConfigRedisDAO };
