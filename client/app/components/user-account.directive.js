/**
 * User profile directive.
 */
(function () {
    'use strict';

    /**
     * @desc Displays the logged in user and logout option.
     * @example <ul user-account></ul>
     */
    angular
        .module('app')
        .directive('userAccount', userAccount);

    function userAccount() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/user-account.directive.html',
            scope: {
                //variableName: '=' // two-way binding. <div user-profile max={{ vm.max }}></div>
            },
            controller: UserAccountController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    UserAccountController.$inject = ['$state', 'authService'];

    function UserAccountController($state, authService) {
        var vm = this;

        vm.logIn = logIn;
        vm.logOut = logOut;
        vm.isLoggedIn = isLoggedIn;
        vm.getLoggedInUsername = getLoggedInUsername;
        vm.loggedInUsername = null;

        function logIn() {
            $state.go('login');
        }

        function logOut() {
            authService.logOut()
                .then(function () {
                    $state.go('home.register');
                });
        }

        function isLoggedIn() {
            return authService.isLoggedIn();
        }

        function getLoggedInUsername() {
            if (!vm.loggedInUsername) {
                vm.loggedInUsername = authService.getLoggedInUser().username;
            }
            return vm.loggedInUsername;
        }
    }
})();