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

        vm.logOut = logOut;

        function logOut() {
            authService.logOut()
                .then(function() {
                    $state.go('login');
                });
        }
    }

})();