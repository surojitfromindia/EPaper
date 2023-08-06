import {DataTypes, Model} from '@sequelize/core';
import sequelize from '../../Config/DataBase.Config.js';
import {AccountTemplateDetails} from '../index.js';

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
        parentCode: {
            type: DataTypes.STRING,
            allowNull: true,
            columnName: 'parent_code',
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'status',
            defaultValue: 'active',
        },
        depth: {
            type: DataTypes.TINYINT,
            allowNull: true,
            columnName: 'depth'

        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'account_type',
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
AccountsOfTemplate.belongsTo(AccountTemplateDetails, {
    foreignKey: {
        allowNull: false,
        columnName: "account_template_id",
        name: "accountTemplateId"
    }, as: "AccountTemplate"
})

export {AccountsOfTemplate};
