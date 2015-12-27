/**
 * App module configuration.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run);

    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        // Use HTML5 History API.
        //$locationProvider.html5Mode(true);

        // Default to index.
        $urlRouterProvider.otherwise('/');

        // Set states.
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/users/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'app/users/logout.html',
                controller: 'LogoutController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/users/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .state('lists', {
                url: '/users/:userId/lists',
                templateUrl: 'app/lists/list.html',
                controller: 'ListController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .state('lists.detail', {
                url: '/:listId/tabs',
                templateUrl: 'app/lists/list-detail.html',
                controller: 'ListDetailController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .state('tabs-source', {
                url: '/lists/:listId/tabs/:tabId',
                templateUrl: 'app/tabs/tab-source.html',
                controller: 'TabSourceController',
                controllerAs: 'vm',
                access: { restricted: false}
            });
    }

    function run($rootScope, $location, $state, authService) {
        $rootScope.$on('$stateChangeStart', function(event, next, current) {
            if (next.access.restricted && !authService.isLoggedIn()) {
                $location.path('/login');
            }
        });
    }
})();
