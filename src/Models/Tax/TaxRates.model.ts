import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic, User } from "../index";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { MathLib } from "../../Utils/MathLib/mathLib";
import { MAXIMUM_NUMERIC_PRECISION } from "../../Constants/General.Constant";

@Table({
  underscored: true,
  tableName: "TaxRates",
})
class TaxRates extends Model<
  InferAttributes<TaxRates>,
  InferCreationAttributes<TaxRates>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  declare description: string;

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  get rate(): number {
    const value = this.getDataValue("rate");
    if (value) {
      return MathLib.getWithPrecision(MAXIMUM_NUMERIC_PRECISION, value);
    }
    return value;
  }

  @Attribute(DataTypes.STRING)
  @NotNull
  declare countryCode: string;
  @Attribute(DataTypes.ENUM("direct_tax", "tax"))
  @NotNull()
  declare taxType: "direct_tax" | "tax";
  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isEditable: boolean;
  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isDeletable: boolean;
  @Default("active")
  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  declare status: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;
  @BelongsTo(() => User, "createdBy")
  declare CreatedBy?: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization: NonAttribute<OrganizationBasic>;
}
export { TaxRates };
