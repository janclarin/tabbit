/**
 * Tab model.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Tab = sequelize.define('Tab', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        songName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        artistName: {
            type: DataTypes.STRING
        },
        source: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function(models) {
                Tab.belongsTo(models.TabType, {foreignKey: 'typeId'});
                Tab.belongsTo(models.TabProgress, {foreignKey: 'progressId'});
            }
        },
        freezeTableName: true
    });
    return Tab;
};