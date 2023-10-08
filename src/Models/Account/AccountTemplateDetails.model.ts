import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { User } from "../User/User.model";
import { OrganizationBasic } from "../Organization/Organization.model";
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
  tableName: "AccountTemplateDetails",
})
class AccountTemplateDetails extends Model<
  InferAttributes<AccountTemplateDetails>,
  InferCreationAttributes<AccountTemplateDetails>
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
  declare countryCode: string;

  @Attribute(DataTypes.STRING)
  declare sector: string;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isDefault: boolean;

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

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare originTemplateId: number;
  @BelongsTo(() => AccountTemplateDetails, "originTemplateId")
  declare OriginTemplate?: NonAttribute<AccountTemplateDetails>;
}
export { AccountTemplateDetails };
