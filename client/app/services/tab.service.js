/**
 * Tab service.
 */
(function() {
   'use strict';

    angular
        .module('app')
        .factory('tabService', tabService);

    tabService.$inject = ['$http'];

    function tabService($http) {
        var apiUrl = '/api/v1';

        return {
            save: save,
            get: get,
            query: query,
            update: update,
            remove: remove
        };

        function save(tab, listId) {
            return $http.post(
                apiUrl + '/lists/' + listId + '/tabs',
                tab
            ).then(function (response) {
                return response.data;
            });
        }

        function get(tabId) {
            return $http.get(
                apiUrl + '/tabs/' + tabId
            ).then(function (response) {
                return response.data;
            });
        }

        function query(listId, params) {
            return $http.get(
                apiUrl + '/lists/' + listId + '/tabs',
                params
            ).then(function (response) {
                return response.data;
            });
        }

        function update(tab) {
            return $http.put(
                apiUrl + '/tabs/' + tab.id,
                tab
            ).then(function (response) {
                return response.data;
            });
        }

        function remove(tabId) {
            return $http.delete(
                apiUrl + '/tabs/' + tabId
            ).then(function (response) {
                return response.data;
            });
        }
    }
})();
