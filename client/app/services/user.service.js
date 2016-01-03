(function() {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var apiUrl = '/api/v1';

        return {
            get: get
        };

        function get(userId) {
            return $http.get(apiUrl + '/users/' + userId)
                .then(function(response) {
                    return response.data; // User object.
                });
        }
    }
})();