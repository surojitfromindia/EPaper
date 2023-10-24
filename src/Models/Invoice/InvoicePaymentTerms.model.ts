import {
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  AllowNull,
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { PaymentTerms } from "../PaymentTerm/PaymentTerms.model";

@Table({
  underscored: true,
  tableName: "InvoicePaymentTerms",
})
class InvoicePaymentTerm extends Model<
  InferAttributes<InvoicePaymentTerm>,
  InferCreationAttributes<InvoicePaymentTerm>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.INTEGER)
  @AllowNull // allow null cause payment term can be custom.
  declare paymentTermId: number;
  @BelongsTo(() => PaymentTerms, "paymentTermId")
  declare PaymentTermDetails?: NonAttribute<PaymentTerms>;

  @Attribute(DataTypes.INTEGER)
  @AllowNull
  paymentTerm: number;

  @Attribute(DataTypes.ENUM("regular", "end_of_month", "end_of_day"))
  @NotNull
  interval: string;
}

type InvoicePaymentTermType = Attributes<InvoicePaymentTerm>;
type InvoicePaymentTermIdType = number;
export { InvoicePaymentTerm };
export type { InvoicePaymentTermType, InvoicePaymentTermIdType };
