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
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class AccountTemplateDetails extends Model {}
//
// AccountTemplateDetails.init(
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
//     countryCode: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "country_code",
//     },
//     sector: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       columnName: "sector",
//     },
//     status: {
//       type: DataTypes.ENUM("active", "deactive"),
//       allowNull: false,
//       columnName: "status",
//       defaultValue: "active",
//     },
//     isDefaultTemplate: {
//       type: DataTypes.BOOLEAN,
//       columnName: "is_default",
//       unique: true,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//   },
// );
//
// AccountTemplateDetails.belongsTo(AccountTemplateDetails, {
//   foreignKey: {
//     allowNull: true,
//     columnName: "origin_template_id",
//     name: "originTemplateId",
//   },
//   as: "OriginAccountTemplate",
// });
//
// AccountTemplateDetails.belongsTo(User, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "created_by",
//     name: "createdBy",
//   },
//   as: "createdByUser",
// });
//
// AccountTemplateDetails.belongsTo(OrganizationBasic, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "organization_id",
//     name: "organizationId",
//   },
//   as: "organization",
// });
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
  declare isDefaultTemplate: boolean;

  @Attribute(DataTypes.ENUM("active", "deactive"))
  @NotNull
  declare status: "active" | "deactive";

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization?: NonAttribute<OrganizationBasic>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;
  @BelongsTo(() => User, "userId")
  declare User?: NonAttribute<User>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare originTemplateId: number;
  @BelongsTo(() => AccountTemplateDetails, "originTemplateId")
  declare OriginTemplate?: NonAttribute<AccountTemplateDetails>;
}
export { AccountTemplateDetails };
