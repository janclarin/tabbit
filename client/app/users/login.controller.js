/**
 * Login controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'authService'];

    function LoginController($state, authService) {
        var vm = this;

        vm.logIn = logIn;
        vm.error = false;
        vm.disabled = false;

        function logIn() {
            authService.logIn(vm.loginForm.username, vm.loginForm.password)
                .then(function() {
                    // Redirect to list controller.
                    var userId = authService.getLoggedInUser().id;
                    $state.go('lists', { userId: userId });
                    vm.disabled = false;
                    vm.loginForm = {};
                })
                .catch(function() {
                    vm.error = true;
                    vm.errorMessage = 'Invalid username and/or password';
                    vm.disabled = false;
                    vm.loginForm.password = '';
                });
        }
    }

})();