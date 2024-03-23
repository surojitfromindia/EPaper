import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { MathLib } from "../../Utils/MathLib/mathLib";
import {
  MAXIMUM_EXCHANGE_RATE_PRECISION,
  MAXIMUM_NUMERIC_PRECISION,
} from "../../Constants/General.Constant";

import {
  AccountsOfOrganization,
  Contacts,
  CurrencyModel,
  InvoicePaymentModel,
  OrganizationBasic,
  PaymentModeModel,
  User,
} from "../index";

@Table({
  underscored: true,
  tableName: "CustomerPayments",
})
class CustomerPaymentModel extends Model<
  InferAttributes<CustomerPaymentModel>,
  InferCreationAttributes<CustomerPaymentModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare issueDate: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare contactId: number;
  @BelongsTo(() => Contacts, "contactId")
  declare Contact?: NonAttribute<Contacts>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare currencyId: number;
  @BelongsTo(() => CurrencyModel, "currencyId")
  declare Currency?: NonAttribute<CurrencyModel>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare paymentNumber: string;

  @Attribute(DataTypes.STRING)
  @Default("")
  declare referenceNumber: string;

  @Attribute(DataTypes.STRING)
  @Default("")
  declare notes: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;
  @BelongsTo(() => User, "createdBy")
  declare CreatedBy?: NonAttribute<User>;
  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  @Default("active")
  declare status: "active" | "deleted";
  @Attribute(DataTypes.ENUM("synced", "notSynced"))
  @NotNull
  @Default("synced")
  declare syncStatus: "synced" | "notSynced";
  // payment mode
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare paymentModeId: number;
  @BelongsTo(() => PaymentModeModel, "paymentModeId")
  declare PaymentMode?: NonAttribute<PaymentModeModel>;
  // account id (deposit account / bank account)
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountId: number;
  @BelongsTo(() => AccountsOfOrganization, "accountId")
  declare Account?: NonAttribute<AccountsOfOrganization>;
  @HasMany(() => InvoicePaymentModel, "paymentId")
  declare Invoices: NonAttribute<InvoicePaymentModel[]>;

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get amount(): number {
    const value = this.getDataValue("amount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get unusedAmount(): number {
    const value = this.getDataValue("unusedAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  // and their bcy values
  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyAmount(): number {
    const value = this.getDataValue("bcyAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyUnusedAmount(): number {
    const value = this.getDataValue("bcyUnusedAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL(10, MAXIMUM_EXCHANGE_RATE_PRECISION))
  @NotNull
  @Default(1)
  get exchangeRate(): number {
    const value = this.getDataValue("exchangeRate");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_EXCHANGE_RATE_PRECISION, value);
    }
    return value;
  }

  // bank charges
  @Attribute(DataTypes.DECIMAL)
  @Default(0)
  @NotNull
  get bankCharges(): number {
    const value = this.getDataValue("bankCharges");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @Default(0)
  @NotNull
  get bcyBankCharges(): number {
    const value = this.getDataValue("bcyBankCharges");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }
}

type CustomerPaymentCreatable = {
  contactId: number;
  paymentNumber: string;
  autoNumberGroupId: number;
  issueDate: string;
  amount: number;
  usedAmount: number;
  bankCharges: number;
  bcyAmount: number;
  bcyBankCharges: number;
  bcyUnusedAmount: number;
  currencyId: number;
  exchangeRate: number;
  paymentModeId: number;
  accountId: number;
  referenceNumber?: string;
  notes?: string;
  organizationId: number;
  createdBy: number;
};

interface CustomerPayment extends CustomerPaymentCreatable {
  id: number;
  CreatedBy?: User;
  PaymentMode?: PaymentModeModel;
  Account?: AccountsOfOrganization;
  Contact?: Contacts;
  Currency?: CurrencyModel;
  Organization?: OrganizationBasic;
  Invoices?: InvoicePaymentModel[];
}

export { CustomerPaymentModel };
export type { CustomerPayment, CustomerPaymentCreatable };
