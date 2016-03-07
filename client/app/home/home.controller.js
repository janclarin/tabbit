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
            if (authService.isLoggedIn()) {
                // Go to the list page if already logged in.
                var loggedInUserId = authService.getLoggedInUser().id;
                $state.go('lists', { userId: loggedInUserId });
            }
        }
    }
})();