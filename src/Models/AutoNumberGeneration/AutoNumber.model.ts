import {
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

class AutoNumbers extends Model<
  InferAttributes<AutoNumbers>,
  InferCreationAttributes<AutoNumbers>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.ENUM("invoice", "credit_note", "customer_payment"))
  declare entityType: string;

  @Attribute(DataTypes.STRING)
  declare prefixString: string;

  @Attribute(DataTypes.STRING)
  declare nextNumber: string;

  @Attribute(DataTypes.INTEGER)
  declare autoNumberGroupId: number;

  @Attribute(DataTypes.INTEGER)
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

export { AutoNumbers };
