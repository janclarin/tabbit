'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        var currentDate = new Date();
        return [
            queryInterface.bulkInsert('TabProgress', [
                { name: 'Currently learning', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Learned', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Plan to learn', createdAt: currentDate, updatedAt: currentDate }
            ], {}),
            queryInterface.bulkInsert('TabType', [
                { name: 'Tab', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Chords', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Sheet', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Guitar Pro', createdAt: currentDate, updatedAt: currentDate }
            ], {})
        ];
    },

    down: function (queryInterface, Sequelize) {
        return [
            queryInterface.bulkDelete('TabProgress', null, {}),
            queryInterface.bulkDelete('TabType', null, {})
        ];
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkDelete('Person', null, {});
         */
    }
};
