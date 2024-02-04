import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { AccountTemplateDetails, User } from "../index";
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
  tableName: "AccountsOfTemplates",
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
  declare accountTemplateId: number;
  @BelongsTo(() => AccountTemplateDetails, "accountTemplateId")
  declare AccountTemplate?: NonAttribute<AccountTemplateDetails>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;
  @BelongsTo(() => User, "createdBy")
  declare CreatedBy?: NonAttribute<User>;

  @Attribute(DataTypes.STRING)
  declare accountSlug: string;

  @Attribute(DataTypes.BOOLEAN)
  declare isSystemAccount: boolean;
}
export { AccountsOfTemplate };
