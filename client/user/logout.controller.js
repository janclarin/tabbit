/**
 * Logout controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$location', 'authService'];

    function LogoutController($location, authService) {
        var vm = this;

        vm.logOut = logOut;

        function logOut() {
            authService.logOut()
                .then(function() {
                    $location.path('/login');
                });
        }
    }

})();