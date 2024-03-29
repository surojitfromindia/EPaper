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

import { OrganizationBasic, User } from "../index";

@Table({
  underscored: true,
  tableName: "PaymentModes",
})
class PaymentModeModel extends Model<
  InferAttributes<PaymentModeModel>,
  InferCreationAttributes<PaymentModeModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  isDefault: boolean;

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

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @Default("active")
  @NotNull
  declare status: "active" | "deleted";

  @Attribute(DataTypes.STRING)
  @NotNull
  @Default("others")
  declare systemName: string;
}

type PaymentModeIdType = PaymentModeModel["id"];
type PaymentModeCreatableRequired = {
  name: string;
  systemName: string;
  isDefault: boolean;
  createdBy: number;
  organizationId: number;
};

interface PaymentMode extends PaymentModeCreatableRequired {
  id: PaymentModeIdType;
}

export { PaymentModeModel };
export type { PaymentModeIdType, PaymentModeCreatableRequired, PaymentMode };
