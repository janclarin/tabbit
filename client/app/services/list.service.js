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
            save: save,
            get: get,
            query: query,
            update: update,
            remove: remove
        };

        function save(list, userId) {
            return $http.post(
                apiUrl + '/users/' + userId + '/lists',
                list
            ).then(function (response) {
                return response.data; // The new list.
            });
        }

        function get(listId) {
            return $http.get(
                apiUrl + '/lists/' + listId
            ).then(function (response) {
                return response.data;
            });
        }

        function query(userId) {
            return $http.get(
                apiUrl + '/users/' + userId + '/lists'
            ).then(function (response) {
                return response.data; // Lists
            });
        }

        function update(list) {
            return $http.put(
                apiUrl + '/lists/' + list.id,
                list
            ).then(function (response) {
                return response.data;
            });
        }

        function remove(listId) {
            return $http.delete(
                apiUrl + '/lists/' + listId
            ).then(function (response) {
                return response.data;
            });
        }
    }
})();
