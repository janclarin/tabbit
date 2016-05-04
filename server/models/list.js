/**
 * List model.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define('List', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isPrivate: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                List.hasMany(models.Tab, { foreignKey: 'listId' });
            }
        },
        freezeTableName: true
    });
    return List;
};