/**
 * Auth service.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$q', '$window', '$http', 'jwtHelper'];

    function authService($q, $window, $http, jwtHelper) {

        var loggedInUser;

        // Create user variable.
        var isUserAuthorized = null;

        return {
            isLoggedIn: isLoggedIn,
            getLoggedInUser: getLoggedInUser,
            getUserStatus: getUserStatus,
            register: register,
            logIn: logIn,
            logOut: logOut
        };

        function isValidToken(token) {
            return token && !jwtHelper.isTokenExpired(token);
        }

        function getLoggedInUser() {
            var token = $window.sessionStorage.token;
            if (!loggedInUser && isValidToken(token)) {
                loggedInUser = jwtHelper.decodeToken(token);
            }
            return loggedInUser;
        }

        function isLoggedIn() {
            var token = $window.sessionStorage.token;
            return token && !jwtHelper.isTokenExpired(token);
        }

        function getUserStatus() {
            return isUserAuthorized;
        }

        // TODO: Move this to userService.
        function register(email, username, password, firstName, lastName) {
            // Create a new instance of deferred.
            var deferred = $q.defer();

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
            // Create a new instance of deferred.
            var deferred = $q.defer();

            // Send a POST request to the server.
            $http.post('/login',
                {
                    username: username,
                    password: password
                })
                .then(function(response) {
                    if (response.status === 200 && response.data) {
                        $window.sessionStorage.token = response.data.token;
                        loggedInUser = getLoggedInUser(); // Store user ID.
                        isUserAuthorized = true;
                        deferred.resolve();
                    } else {
                        isUserAuthorized = false;
                        deferred.reject();
                    }
                }, function(response) {
                    isUserAuthorized = false;
                    deferred.reject();
                });

            // Return promise object.
            return deferred.promise;
        }

        function logOut() {
            // Create a new instance of deferred.
            var deferred = $q.defer();

            // Send a GET request to the server.
            $http.get('/logout')
                .then(function(response) {
                    loggedInUser = null;
                    deferred.resolve();
                })
                .catch(function(response) {
                    loggedInUser = null;
                    deferred.reject();
                });

            // Return promise object.
            return deferred.promise;
        }
    }
})();
