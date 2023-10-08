import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { AccountGroups } from "./AccountGroups.model";
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({
  underscored: true,
  tableName: "AccountTypes",
  createdAt: false,
  updatedAt: false,
})
class AccountTypes extends Model<
  InferAttributes<AccountTypes>,
  InferCreationAttributes<AccountTypes>
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
  declare nameFormatted: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare code: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare accountGroupId: number;

  @BelongsTo(() => AccountGroups, "accountGroupId")
  declare AccountGroup?: NonAttribute<AccountGroups>;
}
export { AccountTypes };
