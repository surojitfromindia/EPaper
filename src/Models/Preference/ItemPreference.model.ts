import {
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
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({
  underscored: true,
  tableName: "ItemPreferences",
  createdAt: false,
  updatedAt: false,
})
class ItemPreference extends Model<
  InferAttributes<ItemPreference>,
  InferCreationAttributes<ItemPreference>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.TINYINT)
  @NotNull
  declare quantityPrecision: number;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isItemNameDuplicationEnabled: boolean;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization: NonAttribute<OrganizationBasic>;
}

export { ItemPreference };
