import {DataTypes, Model} from '@sequelize/core';
import sequelize from '../Config/DataBase.Config.js';
import { UserModel } from './index.js';

class UserCredential extends Model {
}

UserCredential.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            columnName: 'id',
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            columnName: 'password',
        },
        LastLoginDevice :{
            type: DataTypes.STRING,
            allowNull: true,
            columnName: 'last_login_device',
        },
        LastLoginTime:{
            type: DataTypes.DATE,
            allowNull: true,
            columnName: 'last_login_time',
        },
        OtpCode :{
            type: DataTypes.STRING,
            allowNull: true,
            columnName: 'otp_code',
        }
    },
    {
        sequelize,
    }
);

UserModel.hasOne(UserCredential, {
    foreignKey: {
        name: "userId", allowNull: false, columnName: "user_id"
    },
})

export default UserCredential;
