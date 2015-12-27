/**
 * Logout controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$state', 'authService'];

    function LogoutController($state, authService) {
        var vm = this;

        activate();

        function activate() {
            authService.logOut()
                .then(function() {
                    $state.go('home');
                });
        }
    }

})();