/**
 * Verification token model.
 */
'use strict';

module.exports = function (sequelize, DataTypes) {
    var VerificationToken = sequelize.define('VerificationToken', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            allowNull: false,
            type: DataTypes.STRING
        },
        expiryDate: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        classMethods: {
            associate: function (models) {
                VerificationToken.belongsTo(models.User, {foreignKey: 'userId'});
                VerificationToken.belongsTo(models.VerificationTokenType, {foreignKey: 'typeId'});
            }
        },
        freezeTableName: true
    });
    return VerificationToken;
};