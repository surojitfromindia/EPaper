import {DataTypes, Model} from '@sequelize/core';
import sequelize from '../../Config/DataBase.Config.js';

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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'name',
        },
        email: {
            type: DataTypes.STRING,
            columnName: 'email',
        },
        status: {
            type: DataTypes.ENUM('active', 'deactive'),
            allowNull: false,
            defaultValue: "active",
            columnName: 'status',
        },
        // this is a key coming from auth table
        clientId: {
            type: DataTypes.STRING,
            columnName: 'client_id',
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize,
    }
);

export {User};
