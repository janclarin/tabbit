'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'VerificationToken',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                userId: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'User',
                        key: 'id'
                    }
                },
                typeId: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'VerificationTokenType',
                        key: 'id'
                    }
                },
                token: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                expiryDate: {
                    allowNull: false,
                    type: Sequelize.DATE
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
        return queryInterface.dropTable('VerificationToken');
    }
};