import {DataTypes, Model} from '@sequelize/core';
import sequelize from '../Config/DataBase.Config.js';

class User extends Model {
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            columnName: 'id',
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'last_name',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'password',
        },
    },
    {
        sequelize,
    }
);

export default User;
