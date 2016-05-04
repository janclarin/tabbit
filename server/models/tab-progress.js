/**
 * Tab progress model.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var TabProgress = sequelize.define('TabProgress', {
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
                TabProgress.hasMany(models.Tab, { as: 'Tabs', foreignKey: 'progressId' });
            }
        },
        freezeTableName: true
    });
    return TabProgress;
};
