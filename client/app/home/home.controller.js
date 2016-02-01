/**
 * Home controller.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'authService'];

    function HomeController($state, authService) {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();