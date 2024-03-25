import {
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic } from "../index";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({
  underscored: true,
  tableName: "CustomerPaymentPreferences",
})
class CustomerPaymentPreferencesModel extends Model<
  InferAttributes<CustomerPaymentPreferencesModel>,
  InferCreationAttributes<CustomerPaymentPreferencesModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  @Default(true)
  declare isAutoNumberEnabled: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization: NonAttribute<OrganizationBasic>;
}

type CustomerPaymentPreferenceModelType =
  Attributes<CustomerPaymentPreferencesModel>;

export { CustomerPaymentPreferencesModel };
export type { CustomerPaymentPreferenceModelType };
