import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { AccountTemplateDetails, OrganizationBasic, User } from "../index";
import { AccountGroups } from "./AccountGroups.model";
import { AccountTypes } from "./AccountTypes.model";
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
  tableName: "AccountsOfTemplate",
  createdAt: false,
  updatedAt: false,
})
class AccountsOfTemplate extends Model<
  InferAttributes<AccountsOfTemplate>,
  InferCreationAttributes<AccountsOfTemplate>
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
  declare code: string;

  @Attribute(DataTypes.STRING)
  declare parentCode: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare depth: number;

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
  declare accountParentId: number;
  @BelongsTo(() => AccountsOfTemplate, "accountParentId")
  declare AccountParent?: NonAttribute<AccountsOfTemplate>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountGroupId: number;
  @BelongsTo(() => AccountGroups, "accountGroupId")
  declare AccountGroup?: NonAttribute<AccountGroups>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountTypeId: number;
  @BelongsTo(() => AccountTypes, "accountTypeId")
  declare AccountType?: NonAttribute<AccountTypes>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;
  @BelongsTo(() => User, "userId")
  declare User?: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountTemplateId: number;
  @BelongsTo(() => AccountTemplateDetails, "accountTemplateId")
  declare AccountTemplate?: NonAttribute<AccountTemplateDetails>;
}
export { AccountsOfTemplate };
