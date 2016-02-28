/**
 * Auth interceptor service.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$location', '$injector'];

    function authInterceptor($q, $location, $injector) {
        var authService = $injector.get('authService');

        return {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };

        function request(config) {
            config.headers = config.headers || {};
            if (needsAuthorization(config.url) && authService.hasValidToken()) {
                var token = authService.getLoggedInUserToken();
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

        function requestError(rejection) {
            return $q.reject(rejection);
        }

        function response(response) {
            if (response.data.token) {
                authService.setLoggedInUserToken(response.data.token);
            }
            return response;
        }

        function responseError(rejection) {
            if (rejection && rejection.status === 401 && !authService.hasValidToken()) {
                authService.setLoggedInUserToken(null);
                $location.path('/login'); // redirect to login page.
            }
            return $q.reject(rejection);
        }

        /**
         * Used to determine if a request needs the authorization header.
         * @param url
         * @returns {boolean}
         */
        function needsAuthorization(url) {
            var awsUrl = 's3.amazonaws.com'; // Adding auth creates error AWS requests.
            return url.indexOf(awsUrl) === -1;
        }
    }
})();