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
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { User } from "../User/User.model";
import { OrganizationBasic } from "../Organization/Organization.model";

@Table({
  underscored: true,
  tableName: "PaymentTerms",
})
class PaymentTermModel extends Model<
  InferAttributes<PaymentTermModel>,
  InferCreationAttributes<PaymentTermModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  paymentTerm: number;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  isDefault: boolean;

  @Attribute(DataTypes.ENUM("regular", "end_of_month", "end_of_day"))
  @NotNull
  interval: "regular" | "end_of_month" | "end_of_day";

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @Default("active")
  @NotNull
  declare status: "active" | "deleted";

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;
  @BelongsTo(() => User, "createdBy")
  declare CreatedBy?: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;
}

type PaymentTermIdType = PaymentTermModel["id"];
type PaymentTermType = Attributes<PaymentTermModel>;
export { PaymentTermModel };
export type { PaymentTermIdType, PaymentTermType };
