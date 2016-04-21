'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'User',
            {
                id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                email: {
                    allowNull: false,
                    type: Sequelize.STRING,
                    unique: true,
                    validate: {
                        isEmail: true,
                        isLowercase: true // Ensure that it's lowercase when passed in.
                    }
                },
                username: {
                    allowNull: false,
                    type: Sequelize.STRING,
                    unique: true,
                    validate: {
                        isLowercase: true // Ensure that it's lowercase when passed in.
                    }
                },
                password: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                salt: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                firstName: {
                    type: Sequelize.STRING
                },
                lastName: {
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
        return queryInterface.dropTable('User');
    }
};
