import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
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

import { CustomerPaymentModel, Invoice, OrganizationBasic } from "../index";

@Table({
  underscored: true,
  tableName: "InvoicePayments",
})
class InvoicePaymentModel extends Model<
  InferAttributes<InvoicePaymentModel>,
  InferCreationAttributes<InvoicePaymentModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.DATEONLY)
  @NotNull
  declare applyDate: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare paymentId: number;
  @BelongsTo(() => CustomerPaymentModel, "paymentId")
  declare Payment?: NonAttribute<CustomerPaymentModel>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare invoiceId: number;
  @BelongsTo(() => Invoice, "invoiceId")
  declare Invoice?: NonAttribute<Invoice>;
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;
  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  @Default("active")
  declare status: "active" | "deleted";
  @Attribute(DataTypes.ENUM("synced", "notSynced"))
  @NotNull
  @Default("synced")
  declare syncStatus: "synced" | "notSynced";
  @Attribute(DataTypes.ENUM("customer_payment", "invoice_payment"))
  @NotNull
  declare paymentType: "customer_payment" | "invoice_payment";

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get appliedAmount(): number {
    const value = this.getDataValue("appliedAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get bcyAppliedAmount(): number {
    const value = this.getDataValue("bcyAppliedAmount");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  @Default(0)
  get exchangeGainLoss(): number {
    const value = this.getDataValue("exchangeGainLoss");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_EXCHANGE_RATE_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  @Default(0)
  get bcyExchangeGainLoss(): number {
    const value = this.getDataValue("bcyExchangeGainLoss");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_EXCHANGE_RATE_PRECISION, value);
    }
    return value;
  }
}

export { InvoicePaymentModel };
