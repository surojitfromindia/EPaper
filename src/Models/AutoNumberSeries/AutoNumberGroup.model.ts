import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  HasMany,
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
import { OrganizationBasic, User } from "./../index";
import { AutoNumbers } from "./AutoNumber.model";

@Table({
  underscored: true,
  tableName: "AutoNumberGroups",
  createdAt: false,
  updatedAt: false,
})
class AutoNumberGroups extends Model<
  InferAttributes<AutoNumberGroups>,
  InferCreationAttributes<AutoNumberGroups>
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
  declare isDefault: boolean;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isActive: boolean;

  @Attribute(DataTypes.ENUM("active", "deleted"))
  @NotNull
  @Default("active")
  declare status: "active" | "deleted";

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

  // has many AutoNumbers
  @HasMany(() => AutoNumbers, "autoNumberGroupId")
  declare AutoNumbers?: NonAttribute<AutoNumbers[]>;
}

type IAutoNumberGroup = Attributes<AutoNumberGroups>;
export { AutoNumberGroups };
