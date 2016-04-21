'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'List',
            {
                id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                ownerId: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'User',
                        key: 'id'
                    }
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                isPrivate: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('List');
    }
};
