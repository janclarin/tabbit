'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        var currentDate = new Date();
        return queryInterface.bulkInsert('VerificationTokenType', [
            { name: 'Email Verification', createdAt: currentDate, updatedAt: currentDate },
            { name: 'Password Reset', createdAt: currentDate, updatedAt: currentDate }
        ], {});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('VerificationTokenType', null, {});
    }
};
