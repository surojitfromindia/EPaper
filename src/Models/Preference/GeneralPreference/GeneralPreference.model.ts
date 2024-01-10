import {
  Attributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic } from "../../index";
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
  tableName: "GeneralPreferences",
})
class GeneralPreferenceModel extends Model<
  InferAttributes<GeneralPreferenceModel>,
  InferCreationAttributes<GeneralPreferenceModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.ENUM("inclusive", "exclusive", "entity_level"))
  @NotNull()
  declare salesTaxType: "inclusive" | "exclusive" | "entity_level";

  @Attribute(DataTypes.ENUM("item_level", "entity_level"))
  @NotNull()
  declare taxRoundingType: "item_level" | "entity_level";

  @Attribute(DataTypes.ENUM("item_level", "entity_level", "no_discount"))
  @NotNull()
  declare discountType: "item_level" | "entity_level" | "no_discount";

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isDiscountBeforeTax: boolean;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization: NonAttribute<OrganizationBasic>;
}

type GeneralPreference = Attributes<GeneralPreferenceModel>;
export { GeneralPreferenceModel };
export type { GeneralPreference };
