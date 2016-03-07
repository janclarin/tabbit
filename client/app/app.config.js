/**
 * App module configuration.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .config(configure)
        .run(run);

    function configure($stateProvider, $urlRouterProvider, $httpProvider) {
        // Set states.
        $stateProvider
            .state('home', {
                url: '/',
                abstract: true, // Active with register child.
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .state('home.register', {
                url: '', // Active when parent is active.
                templateUrl: 'app/users/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .state('login', {
                url: '/login',
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
            .state('lists', {
                url: '/users/:userId/lists',
                templateUrl: 'app/lists/list.html',
                controller: 'ListController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .state('lists.detail', {
                url: '/:listId',
                templateUrl: 'app/lists/list-detail.html',
                controller: 'ListDetailController',
                controllerAs: 'vm',
                access: { restricted: false }
            });

        // Default to index.
        $urlRouterProvider.otherwise('/');

        // Add the JWT auth interceptor.
        $httpProvider.interceptors.push('authInterceptor');
    }

    function run($rootScope, $location, $state, authService) {
        $rootScope.$on('$stateChangeStart', function(event, next, current) {
            if (next.access.restricted && !authService.isLoggedIn()) {
                $location.path('/');
            }
        });
    }
})();
