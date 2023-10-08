// association between user and organization
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic, User } from "./index";
import {
  AllowNull,
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
  tableName: "OrganizationsUsers",
  createdAt: false,
  updatedAt: false,
})
class OrganizationsUsers extends Model<
  InferAttributes<OrganizationsUsers>,
  InferCreationAttributes<OrganizationsUsers>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.ENUM("working", "suspended"))
  @NotNull
  @Default("working")
  declare jobStatus: string;

  @Attribute(DataTypes.ENUM("active", "deactive", "invited"))
  @NotNull
  declare status: string;

  @Attribute(DataTypes.ENUM("admin", "staff"))
  @NotNull
  declare roleId: string;

  @Attribute(DataTypes.INTEGER)
  @AllowNull
  declare invitedBy: number;

  @BelongsTo(() => User, "invitedBy")
  declare InvitedBy?: NonAttribute<User>;

  @Attribute(DataTypes.DATE)
  @AllowNull
  declare invitedOn: Date;

  @Attribute(DataTypes.DATE)
  @AllowNull
  declare acceptedOn: Date;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isDefaultOrganization: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @BelongsTo(() => User, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
  })
  declare User: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, {
    foreignKey: {
      name: "organizationId",
      allowNull: false,
    },
  })
  declare Organization: NonAttribute<User>;
}

export { OrganizationsUsers };
