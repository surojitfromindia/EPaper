import {DataTypes, Model} from '@sequelize/core';
import sequelize from '../../Config/DataBase.Config.js';

class AccountsOfTemplate extends Model {
}

AccountsOfTemplate.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            columnName: 'id',
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'name',
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'code',
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'status',
            defaultValue: 'active',
        },
        depth: {
            type: DataTypes.TINYINT,
            allowNull: false,
            columnName: 'depth'

        }
    },
    {
        sequelize,
    }
);

AccountsOfTemplate.belongsTo(AccountsOfTemplate, {
    foreignKey: {
        allowNull: true,
        columnName: "account_parent_id",
        name: "accountParentId"
    }, as: "AccountParent"
});
AccountsOfTemplate.belongsTo(AccountsOfTemplate, {
    foreignKey: {
        allowNull: true,
        columnName: "account_group_id",
        name: "accountGroupId"

    }, as: "AccountGroup"
});
AccountsOfTemplate.belongsTo(AccountsOfTemplate, {
    foreignKey: {
        allowNull: true,
        columnName: "account_type_id",
        name: "accountTypeId"
    }, as: "AccountType"
});

export {AccountsOfTemplate};
