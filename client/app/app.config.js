/**
 * App module configuration.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run);

    function config($routeProvider, $locationProvider) {
        // Use HTML5 History API.
        //$locationProvider.html5Mode(true);

        // Configure routes.
        $routeProvider
            .when('/', {
                templateUrl: 'app/user/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .when('/login', {
                templateUrl: 'app/user/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .when('/logout', {
                templateUrl: 'app/user/logout.html',
                controller: 'LogoutController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .when('/register', {
                templateUrl: 'app/user/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                access: { restricted: false }
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function run($rootScope, $location, $route, authService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if (next.access.restricted && !authService.isLoggedIn()) {
                $location.path('/login');
            }
        });
    }
})();