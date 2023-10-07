import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  AllowNull,
  Attribute,
  AutoIncrement,
  BelongsToMany,
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { OrganizationBasic } from "../Organization/Organization.model";
import { OrganizationsUsers } from "../OrganizationsUsers.model";

// class User extends Model {}
//
// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       columnName: "id",
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "name",
//     },
//     email: {
//       type: DataTypes.STRING,
//       columnName: "email",
//     },
//     status: {
//       type: DataTypes.ENUM("active", "deactive"),
//       allowNull: false,
//       defaultValue: "active",
//       columnName: "status",
//     },
//     // this is a key coming from auth table
//     clientId: {
//       type: DataTypes.STRING,
//       columnName: "client_id",
//       allowNull: false,
//       unique: true,
//     },
//   },
//   {
//     sequelize,
//   },
// );

@Table({
  underscored: true,
  tableName: "Users",
  createdAt: false,
  updatedAt: false,
})
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string;

  @Attribute(DataTypes.STRING)
  @AllowNull
  declare clientId: string;

  @Attribute(DataTypes.ENUM("active", "deactive"))
  @NotNull
  @Default("active")
  declare status: string;

  @BelongsToMany(() => OrganizationBasic, {
    through: OrganizationsUsers,
    foreignKey: "userId",
    otherKey: "organizationId",
    inverse: {
      as: "Users",
    },
    throughAssociations: {
      fromSource: "UserOrganizations",
      toSource: "User",
      toTarget: "Organization",
    },
  })
  declare Organizations: NonAttribute<OrganizationBasic[]>;
}

export { User };
