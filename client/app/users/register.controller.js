/**
 * Register controller.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', 'authService'];

    function RegisterController($location, authService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.error = false;
            vm.disabled = false;

            authService.register(
                vm.registerForm.email,
                vm.registerForm.username,
                vm.registerForm.password,
                vm.registerForm.firstName,
                vm.registerForm.lastName
                )
                .then(function () {
                    $location.path('/login');
                    vm.disabled = false;
                    vm.registerForm = {};
                })
                .catch(function () {
                    vm.error = true;
                    vm.errorMessage = 'Something went wrong';
                    vm.disabled = false;
                    // Reset the form on problem? vm.registerForm = {};
                });
        }
    }

})();
