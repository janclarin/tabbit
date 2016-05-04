/**
 * Tab type model.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var TabType = sequelize.define('TabType', {
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
            associate: function(models) {
                TabType.hasMany(models.Tab, { as: 'Tabs', foreignKey: 'typeId' });
            }
        },
        freezeTableName: true
    });
    return TabType;
};