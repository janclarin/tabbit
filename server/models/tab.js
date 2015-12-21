/**
 * Tab model.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Tab = sequelize.define('Tab', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        songName: {
            type: DataTypes.STRING,
            allowNull: false
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
                Tab.belongsTo(models.TabType);
                Tab.belongsTo(models.TabProgress);
            }
        },
        freezeTableName: true
    });
    return Tab;
};