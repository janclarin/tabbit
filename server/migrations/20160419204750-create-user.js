'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'User',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                email: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                    validate: {
                        isEmail: true,
                        isLowercase: true // Ensure that it's lowercase when passed in.
                    }
                },
                username: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                    validate: {
                        isLowercase: true // Ensure that it's lowercase when passed in.
                    }
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                salt: {
                    type: Sequelize.STRING,
                    allowNull: false
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
