import {
  CreationAttributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { User } from "../index";
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
  tableName: "OrganizationBasics",
})
class OrganizationBasic extends Model<
  InferAttributes<OrganizationBasic>,
  InferCreationAttributes<OrganizationBasic>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare primaryAddress: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare countryCode: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare sector: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare currencyCode: string;

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  @Default("active")
  declare status: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;

  @BelongsTo(() => User, "createdBy")
  declare createdByUser?: NonAttribute<User>;
}

type OrganizationBasicCreatable = CreationAttributes<OrganizationBasic>;
type OrganizationBasicIdType = number;

export { OrganizationBasic };
export type { OrganizationBasicIdType, OrganizationBasicCreatable };
