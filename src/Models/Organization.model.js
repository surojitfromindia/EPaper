import {DataTypes, Model} from '@sequelize/core';
import sequelize from '../Config/DataBase.Config.js';
import {UserModel} from './index.js';

class OrganizationBasic extends Model {
}

OrganizationBasic.init({
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, columnName: 'id', allowNull: false,
    }, name: {
        type: DataTypes.STRING, allowNull: false, columnName: 'name',
    }, primaryAddress: {
        type: DataTypes.STRING, allowNull: false, columnName: 'primary_address',
    }, countryCode: {
        type: DataTypes.STRING, allowNull: false, columnName: 'country_code',
    }, currencyCode: {
        type: DataTypes.STRING, allowNull: false, columnName: 'currency_code',
    }, status: {
        type: DataTypes.STRING, allowNull: false, columnName: 'status', defaultValue: 'active',
    },
}, {
    sequelize,
});

UserModel.hasOne(OrganizationBasic, {
    foreignKey: {
        name: "userId", allowNull: false, columnName: "user_id"
    },

});

export {OrganizationBasic};
