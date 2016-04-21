'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'List',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                ownerId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'User',
                        key: 'id'
                    }
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                isPrivate: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
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
