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

        roleId: {
            type: DataTypes.ENUM('admin', 'staff'),
            allowNull: false,
            columnName: 'role_id'
        },

        invitedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            columnName: 'invited_by',
            references: {
                key: "id",
                model: User
            }
        },
        invitedOn: {
            type: DataTypes.DATE,
            allowNull: true,
            columnName: 'invited_on'
        },
        acceptedOn: {
            type: DataTypes.DATE,
            allowNull: true,
            columnName: 'accepted_on'
        },
        isDefaultOrganization: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            columnName: 'is_default_organization',
        }
    },
    {
        sequelize,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'organization_id', 'is_default_organization'],
            }
        ],


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
OrganizationBasic.hasMany(OrganizationsUsers, {
    as: "activeUsers",
    foreignKey: {name: "organizationId", columnName: 'organization_id', allowNull: false}
})


export {OrganizationsUsers};
