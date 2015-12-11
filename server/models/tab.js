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
        },
        type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['tab', 'sheet', 'chords']
        },
        progress: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['want-to-learn', 'learning', 'learned']
        }/*,
        dateStarted: {
            type: DataTypes.DATE,
        }
        */
    }, {
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Tab;
};