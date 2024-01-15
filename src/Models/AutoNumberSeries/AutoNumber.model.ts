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
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
} from "@sequelize/core/decorators-legacy";
import { OrganizationBasic } from "../Organization/Organization.model";
import { User } from "../User/User.model";

type IAutoNumberEntityTypes = "invoice" | "credit_note" | "customer_payment";

class AutoNumbers extends Model<
  InferAttributes<AutoNumbers>,
  InferCreationAttributes<AutoNumbers>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.ENUM("invoice", "credit_note", "customer_payment"))
  @NotNull
  declare entityType: IAutoNumberEntityTypes;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare prefixString: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare nextNumber: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare autoNumberGroupId: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare numberZeroPad: number;

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
}

type IAutoNumber = Attributes<AutoNumbers>;
export { AutoNumbers };
export type { IAutoNumber, IAutoNumberEntityTypes };