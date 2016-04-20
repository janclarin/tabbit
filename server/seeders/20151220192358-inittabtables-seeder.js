'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        var currentDate = new Date();
        return [
            queryInterface.bulkInsert('TabProgress', [
                { name: 'Currently Learning', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Learned', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Plan to Learn', createdAt: currentDate, updatedAt: currentDate }
            ], {}),
            queryInterface.bulkInsert('TabType', [
                { name: 'Tab', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Chords', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Music Sheet', createdAt: currentDate, updatedAt: currentDate },
                { name: 'Guitar Pro', createdAt: currentDate, updatedAt: currentDate }
            ], {})
        ];
    },

    down: function (queryInterface, Sequelize) {
        return [
            queryInterface.bulkDelete('TabProgress', null, {}),
            queryInterface.bulkDelete('TabType', null, {})
        ];
    }
};
