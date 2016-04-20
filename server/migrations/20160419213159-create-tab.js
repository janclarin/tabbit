'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'Tab',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                listId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'List',
                        key: 'id'
                    }
                },
                progressId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'TabProgress',
                        key: 'id'
                    }
                },
                typeId: {
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
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                }
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Tab');
    }
};
