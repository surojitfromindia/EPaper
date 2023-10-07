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

// class OrganizationsUsers extends Model {}
//
// OrganizationsUsers.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       columnName: "id",
//       allowNull: false,
//     },
//
//     jobStatus: {
//       type: DataTypes.ENUM("working", "suspended"),
//       allowNull: true,
//       columnName: "job_status",
//     },
//
//     status: {
//       type: DataTypes.ENUM("active", "deactive", "invited"),
//       allowNull: false,
//       columnName: "status",
//     },
//
//     roleId: {
//       type: DataTypes.ENUM("admin", "staff"),
//       allowNull: false,
//       columnName: "role_id",
//     },
//
//     invitedBy: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       columnName: "invited_by",
//       references: {
//         key: "id",
//         model: User,
//       },
//     },
//     invitedOn: {
//       type: DataTypes.DATE,
//       allowNull: true,
//       columnName: "invited_on",
//     },
//     acceptedOn: {
//       type: DataTypes.DATE,
//       allowNull: true,
//       columnName: "accepted_on",
//     },
//     isDefaultOrganization: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//       columnName: "is_default_organization",
//     },
//   },
//   {
//     sequelize,
//     indexes: [
//       {
//         unique: true,
//         fields: ["user_id", "organization_id", "is_default_organization"],
//       },
//     ],
//   },
// );
//
// OrganizationBasic.belongsToMany(User, {
//   as: {
//     singular: "user",
//     plural: "users",
//   },
//   through: OrganizationsUsers,
//   foreignKey: { name: "organizationId", columnName: "organization_id" },
//   otherKey: { name: "userId", columnName: "user_id" },
// });
// User.belongsToMany(OrganizationBasic, {
//   as: {
//     singular: "organizationBasic",
//     plural: "organizationsBasic",
//   },
//   through: OrganizationsUsers,
//   foreignKey: { name: "userId", columnName: "user_id" },
//   otherKey: { name: "organizationId", columnName: "organization_id" },
// });
//
// User.hasMany(OrganizationsUsers, {
//   as: "activeOrganizations",
//   foreignKey: { name: "userId", columnName: "user_id", allowNull: false },
// });
// OrganizationBasic.hasMany(OrganizationsUsers, {
//   as: "activeUsers",
//   foreignKey: {
//     name: "organizationId",
//     columnName: "organization_id",
//     allowNull: false,
//   },
// });

@Table({
  underscored: true,
  tableName: "OrganizationsUsers",
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
  @AllowNull
  declare userId: number;

  @BelongsTo(() => User, "userId")
  declare User: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @AllowNull
  declare organizationId: number;

  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization: NonAttribute<OrganizationBasic>;
}
export { OrganizationsUsers };
