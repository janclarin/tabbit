/**
 * List controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$location'];

    function ListController($location) {
        var vm = this;
    }
});