/**
 * List service.
 */
(function() {
   'use strict';

    angular
        .module('app')
        .factory('listService', listService);

    listService.$inject = ['$http'];

    function listService($http) {

        var apiUrl = '/api/v1';

        return {
            get: get,
            query: query
        };

        function get(listId) {
            return $http.get(
                apiUrl + '/lists/' + listId
            ).then(function(response) {
                return response.data;
            });
        }

        function query(userId) {
            return $http.get(
                apiUrl + '/users/' + userId + '/lists'
            ).then(function(response) {
                return response.data; // Lists
            });
        }
    }
})();
