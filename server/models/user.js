/**
 * User model.
 */
'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
                isLowercase: true // Ensure that it's lowercase when passed in.
            }
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isLowercase: true // Ensure that it's lowercase when passed in.
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        salt: {
            allowNull: false,
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        isEmailVerified: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.List, {foreignKey: 'ownerId'});
            }
        },
        instanceMethods: {
            getFullName: function () {
                return [this.firstName, this.lastName].join(' ');
            }
        },
        freezeTableName: true
    });
    return User;
};
