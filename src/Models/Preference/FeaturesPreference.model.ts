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
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({
  underscored: true,
  tableName: "FeaturesPreferences",
})
class FeaturesPreferenceModel extends Model<
  InferAttributes<FeaturesPreferenceModel>,
  InferCreationAttributes<FeaturesPreferenceModel>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  @Default(false)
  declare isMultipleAutoNumberSeriesEnable: boolean;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  @Default(false)
  declare isMultipleBranchesEnable: boolean;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  @Default(false)
  declare isMultipleBranchesActive: boolean;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization: NonAttribute<OrganizationBasic>;
}

export { FeaturesPreferenceModel };
