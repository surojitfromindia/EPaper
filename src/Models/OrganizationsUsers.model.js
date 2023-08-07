// association between user and organization
import {DataTypes, Model} from '@sequelize/core';
import sequelize from '../Config/DataBase.Config.js';
import {OrganizationBasic, User} from "./index.js";

class OrganizationsUsers extends Model {
}

OrganizationsUsers.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            columnName: 'id',
            allowNull: false,
        },

        jobStatus: {
            type: DataTypes.ENUM('working', 'suspended'),
            allowNull: true,
            columnName: "job_status"
        },

        status: {
            type: DataTypes.ENUM('active', 'deactive', 'invited'),
            allowNull: false,
            columnName: 'status',
        },

    },
    {
        sequelize,

    }
);


OrganizationBasic.belongsToMany(User, {
    as: {
        singular: "user", plural: "users"
    },
    through: OrganizationsUsers,
    foreignKey: {name: "organizationId", columnName: "organization_id"},
    otherKey: {name: 'userId', columnName: "user_id"}
})
User.belongsToMany(OrganizationBasic, {
    as: {
        singular: "organizationBasic", plural: "organizationsBasic"
    },
    through: OrganizationsUsers,
    foreignKey: {name: 'userId', columnName: "user_id"},
    otherKey: {name: "organizationId", columnName: "organization_id"},
})

User.hasMany(OrganizationsUsers, {
    as: "activeOrganizations",
    foreignKey: {name: "userId", columnName: "user_id", allowNull: false},
})


export {OrganizationsUsers};
