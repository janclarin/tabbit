/**
 * Tab type model.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var TabType = sequelize.define('TabType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
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