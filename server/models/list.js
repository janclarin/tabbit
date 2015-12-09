/**
 * List model.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define('List', {
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
                List.hasMany(models.Tab, { foreignKey: 'listId' });
            }
        }
    });
    return List;
};