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
  CreationAttributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic, User } from "./../index";
import { AutoNumbersModel } from "./AutoNumber.model";

@Table({
  underscored: true,
  tableName: "AutoNumberGroups",
  createdAt: false,
  updatedAt: false,
})
class AutoNumberGroupsModel extends Model<
  InferAttributes<AutoNumberGroupsModel>,
  InferCreationAttributes<AutoNumberGroupsModel>
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
  @HasMany(() => AutoNumbersModel, "autoNumberGroupId")
  declare AutoNumbers?: NonAttribute<AutoNumbersModel[]>;
}

type IAutoNumberGroup = Attributes<AutoNumberGroupsModel>;
type IAutoNumberGroupCreationAttributes =
  CreationAttributes<AutoNumberGroupsModel>;
export { AutoNumberGroupsModel };
export type { IAutoNumberGroup, IAutoNumberGroupCreationAttributes };
