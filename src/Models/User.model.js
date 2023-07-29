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
        middleName: {
            type: DataTypes.STRING,
            allowNull: true,
            columnName: 'middle_name',
            defaultValue: '',
        },
        email :{
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'email',
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "A",
            columnName: 'status',
        }
    },
    {
        sequelize,
    }
);

export default User;
