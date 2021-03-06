/**
 * Tab progress model.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var TabProgress = sequelize.define('TabProgress', {
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
                TabProgress.hasMany(models.Tab, { as: 'Tabs', foreignKey: 'progressId' });
            }
        },
        freezeTableName: true
    });
    return TabProgress;
};
