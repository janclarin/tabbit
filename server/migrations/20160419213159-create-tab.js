'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'Tab',
            {
                id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                listId: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'List',
                        key: 'id'
                    }
                },
                progressId: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'TabProgress',
                        key: 'id'
                    }
                },
                typeId: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'TabType',
                        key: 'id'
                    }
                },
                songName: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                artistName: {
                    type: Sequelize.STRING
                },
                source: {
                    type: Sequelize.STRING
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
        return queryInterface.dropTable('Tab');
    }
};
