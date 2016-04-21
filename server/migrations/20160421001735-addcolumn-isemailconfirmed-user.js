'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'User',
            'isEmailConfirmed',
            {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('User', 'isEmailConfirmed');
    }
};
