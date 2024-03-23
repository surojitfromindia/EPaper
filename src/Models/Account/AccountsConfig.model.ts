// store config of accounts along with account template id and organization.

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { AccountTemplateDetails } from "./AccountTemplateDetails.model";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { AccountsOfOrganization } from "./AccountsOfOrganization.model";

@Table({
  underscored: true,
  tableName: "AccountsConfigs",
})
class AccountsConfig extends Model<
  InferAttributes<AccountsConfig>,
  InferCreationAttributes<AccountsConfig>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  @Default("active")
  declare status: "active" | "deleted";

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountTemplateId: number;
  @BelongsTo(() => AccountTemplateDetails, "accountTemplateId")
  declare AccountTemplate?: NonAttribute<AccountTemplateDetails>;

  // default account for organization
  // 1. tax account
  // 2. sales account
  // 3. purchase account
  // 4. discount account
  // 5. purchase discount account
  // 6. exchange gain or loss account
  // 7. unearned revenue account
  // 8. account receivable account
  // 9. account payable account
  // 10. inventory account
  // 11. cost of goods sold account
  // 12. bank account
  // 13. bad debt account
  // 14. opening balance account
  // 15. retained earnings account
  // 16. opening balance adjustment account
  // 17. default bank fee and charges account
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultTaxAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultTaxAccountId")
  declare DefaultTaxAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultSalesAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultSalesAccountId")
  declare DefaultSalesAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultPurchaseAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultPurchaseAccountId")
  declare DefaultPurchaseAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultDiscountAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultDiscountAccountId")
  declare DefaultDiscountAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultPurchaseDiscountAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultPurchaseDiscountAccountId")
  declare DefaultPurchaseDiscountAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultExchangeGainLossAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultExchangeGainLossAccountId")
  declare DefaultExchangeGainLossAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultUnearnedRevenueAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultUnearnedRevenueAccountId")
  declare DefaultUnearnedRevenueAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultAccountsReceivableAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultAccountsReceivableAccountId")
  declare DefaultAccountsReceivableAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultAccountsPayableAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultAccountsPayableAccountId")
  declare DefaultAccountsPayableAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultInventoryAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultInventoryAccountId")
  declare DefaultInventoryAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultCostOfGoodsSoldAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultCostOfGoodsSoldAccountId")
  declare DefaultCostOfGoodsSoldAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultBankAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultBankAccountId")
  declare DefaultBankAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultBadDebtAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultBadDebtAccountId")
  declare DefaultBadDebtAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultOpeningBalanceOffsetAccountId: number;
  @BelongsTo(
    () => AccountsOfOrganization,
    "defaultOpeningBalanceOffsetAccountId",
  )
  declare DefaultOpeningBalanceOffsetAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultRetainedEarningsAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultRetainedEarningsAccountId")
  declare DefaultRetainedEarningsAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultOpeningBalanceAdjustmentsAccountId: number;
  @BelongsTo(
    () => AccountsOfOrganization,
    "defaultOpeningBalanceAdjustmentsAccountId",
  )
  declare DefaultOpeningBalanceAdjustmentsAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare defaultBankFeeAndChargesAccountId: number;
  @BelongsTo(() => AccountsOfOrganization, "defaultBankFeeAndChargesAccountId")
  declare DefaultBankFeeAndChargesAccount?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
}

type AccountConfigType = {
  id: number;
  organizationId: number;
  status: "active" | "deleted";
  accountTemplateId: number;
  defaultTaxAccountId: number;
  defaultSalesAccountId: number;
  defaultPurchaseAccountId: number;
  defaultDiscountAccountId: number;
  defaultPurchaseDiscountAccountId: number;
  defaultExchangeGainLossAccountId: number;
  defaultUnearnedRevenueAccountId: number;
  defaultAccountsReceivableAccountId: number;
  defaultAccountsPayableAccountId: number;
  defaultInventoryAccountId: number;
  defaultCostOfGoodsSoldAccountId: number;
  defaultBankAccountId: number;
  defaultBadDebtAccountId: number;
  defaultOpeningBalanceOffsetAccountId: number;
  defaultRetainedEarningsAccountId: number;
  defaultOpeningBalanceAdjustmentsAccountId: number;
  defaultBankFeeAndChargesAccountId: number;
};
type AccountConfigCreatableType = Omit<AccountConfigType, "id" | "status">;

export { AccountsConfig };
export type { AccountConfigType, AccountConfigCreatableType };
