'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'TabProgress',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
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
        return queryInterface.dropTable('TabProgress');
    }
};
