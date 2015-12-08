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
        songName: DataTypes.STRING,
        artistName: DataTypes.STRING,
        source: DataTypes.STRING,
        progress: {
            type: DataTypes.ENUM,
            values: ['want-to-learn', 'learning', 'learned']
        }
    }, {
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Tab;
};