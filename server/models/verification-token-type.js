/**
 * Verification type model.
 */
'use strict';

module.exports = function (sequelize, DataTypes) {
    var VerificationTokenType = sequelize.define('VerificationTokenType', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                VerificationTokenType.hasMany(models.VerificationToken, { as: 'VerificationToken', foreignKey: 'typeId' });
            }
        },
        freezeTableName: true
    });
    return VerificationTokenType;
};