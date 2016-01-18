/**
 * Auth service.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$q', '$window', '$injector', 'jwtHelper'];

    function authService($q, $window, $injector, jwtHelper) {
        var loggedInUser;

        return {
            isLoggedIn: isLoggedIn,
            isAuthorized: isAuthorized,
            getLoggedInUser: getLoggedInUser,
            getLoggedInUserToken: getLoggedInUserToken,
            setLoggedInUserToken: setLoggedInUserToken,
            hasValidToken: hasValidToken,
            register: register,
            logIn: logIn,
            logOut: logOut
        };

        function getLoggedInUserToken() {
            return $window.localStorage.getItem('jwtToken');
        }

        function setLoggedInUserToken(token) {
            $window.localStorage.setItem('jwtToken', token);
        }

        function hasValidToken() {
            var token = getLoggedInUserToken();
            try {
                return token && !jwtHelper.isTokenExpired(token);
            } catch(e) {
                return false;
            }
        }

        function getLoggedInUser() {
            if (!loggedInUser && hasValidToken()) {
                var token = getLoggedInUserToken();
                loggedInUser = jwtHelper.decodeToken(token);
            }
            return loggedInUser;
        }

        /**
         * Indicates if the logged in user's ID matches the specified user ID.
         * @param userId
         * @returns {boolean}
         */
        function isAuthorized(userId) {
            var user = getLoggedInUser();
            return user && user.id == userId;
        }

        function isLoggedIn() {
            return hasValidToken() && getLoggedInUser();
        }

        // TODO: Move this to userService.
        function register(email, username, password, firstName, lastName) {
            // Create a new instance of deferred.
            var deferred = $q.defer();

            var $http = $injector.get('$http');
            // Send a POST request to the server.
            $http.post('/api/v1/users', {
                    email: email,
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                })
                .then(function(response) {
                    if (response.status === 201 && response.data) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                }, function(response) {
                    deferred.reject();
                });

            // Return promise object.
            return deferred.promise;
        }

        function logIn(username, password) {
            var $http = $injector.get('$http');
            // Send a POST request to the server.
            return $http.post('/login',
                {
                    username: username,
                    password: password
                })
                .then(function(response) {
                    if (response.status === 200 && response.data) {
                        loggedInUser = getLoggedInUser(); // Store user ID.
                    }
                });
        }

        function logOut() {
            var $http = $injector.get('$http');
            // Send a GET request to the server.
            return $http.get('/logout')
                .then(function(response) {
                    loggedInUser = null;
                    setLoggedInUserToken(null);
                })
                .catch(function(response) {
                    loggedInUser = null;
                    setLoggedInUserToken(null);
                });
        }
    }
})();
