/**
 * Auth service.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$q', '$timeout', '$http'];

    function authService($q, $timeout, $http) {

        // Create user variable.
        var isUserAuthorized = null;

        return {
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            register: register,
            logIn: logIn,
            logOut: logOut
        };

        function isLoggedIn() {
            return Boolean(isUserAuthorized);
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
                    if (response.status === 200 && response.data.status) {
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
                    user = false;
                    deferred.resolve();
                }, function(response) {
                    user = false;
                    deferred.reject();
                });

            // Return promise object.
            return deferred.promise;
        }
    }
})();
