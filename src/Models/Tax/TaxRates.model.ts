import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { OrganizationBasic, User } from "../index";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

// class TaxRates extends Model {}
//
// TaxRates.init(
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
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       columnName: "description",
//     },
//     rate: {
//       type: DataTypes.DECIMAL,
//       allowNull: false,
//       columnName: "rate",
//       get() {
//         return MathLib.getWithPrecision(
//           MAXIMUM_NUMERIC_PRECISION,
//           this.getDataValue("rate"),
//         );
//       },
//     },
//     rateFormatted: {
//       type: DataTypes.VIRTUAL,
//       get() {
//         return this.getDataValue("rate");
//       },
//     },
//     countryCode: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "country_code",
//     },
//     taxType: {
//       type: DataTypes.ENUM(["direct_tax", "tax"]),
//       allowNull: false,
//       columnName: "tax_type",
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       columnName: "status",
//       defaultValue: "active",
//     },
//     isEditable: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       columnName: "is_editable",
//     },
//     isDeletable: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       columnName: "is_deletable",
//     },
//   },
//   {
//     sequelize,
//     indexes: [
//       {
//         type: "unique",
//         fields: ["organization_id", "rate"],
//       },
//     ],
//   },
// );
//
// TaxRates.belongsTo(User, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "created_by",
//     name: "createdBy",
//   },
//   as: "createdByUser",
// });
// TaxRates.belongsTo(OrganizationBasic, {
//   foreignKey: {
//     allowNull: false,
//     columnName: "organization_id",
//     name: "organizationId",
//   },
//   as: "organization",
// });

@Table({
  underscored: true,
  tableName: "TaxRates",
})
class TaxRates extends Model<
  InferAttributes<TaxRates>,
  InferCreationAttributes<TaxRates>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  declare description: string;

  @Attribute(DataTypes.DECIMAL)
  @NotNull
  declare rate: number;
  @Attribute(DataTypes.STRING)
  @NotNull
  declare countryCode: string;
  @Attribute(DataTypes.ENUM("direct_tax", "tax"))
  @NotNull()
  declare taxType: "direct_tax" | "tax";
  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isEditable: boolean;
  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isDeletable: boolean;
  @Attribute(DataTypes.ENUM("active", "deactive"))
  @NotNull
  declare status: string;
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;
  @BelongsTo(() => User, "userId")
  declare User: NonAttribute<User>;
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare organizationId: number;
  @BelongsTo(() => OrganizationBasic, "organizationId")
  declare Organization: NonAttribute<OrganizationBasic>;

  get rateFormatted(): NonAttribute<string> {
    return this.getDataValue("rate").toString();
  }
}
export { TaxRates };
