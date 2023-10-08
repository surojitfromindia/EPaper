import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  AccountGroups,
  AccountTemplateDetails,
  AccountTypes,
  OrganizationBasic,
  User,
} from "../index";
import { AccountsOfTemplate } from "./AccountsOfTemplate.model";
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
  tableName: "AccountsOfOrganizations",
  createdAt: false,
  updatedAt: false,
})
class AccountsOfOrganization extends Model<
  InferAttributes<AccountsOfOrganization>,
  InferCreationAttributes<AccountsOfOrganization>
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
  declare description: string;

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
  @BelongsTo(() => AccountsOfOrganization, "accountParentId")
  declare AccountParent?: NonAttribute<AccountsOfOrganization>;

  @Attribute(DataTypes.INTEGER)
  declare originAccountId: number;
  @BelongsTo(() => AccountsOfTemplate, "originAccountId")
  declare OriginAccount?: NonAttribute<AccountsOfTemplate>;

  @Attribute(DataTypes.INTEGER)
  declare originAccountParentId: number;
  @BelongsTo(() => AccountsOfTemplate, "originAccountParentId")
  declare OriginAccountParent?: NonAttribute<AccountsOfTemplate>;

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
  declare createdBy: number;
  @BelongsTo(() => User, "createdBy")
  declare CreatedBy?: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountTemplateId: number;
  @BelongsTo(() => AccountTemplateDetails, "accountTemplateId")
  declare AccountTemplate?: NonAttribute<AccountTemplateDetails>;
}
export { AccountsOfOrganization };
