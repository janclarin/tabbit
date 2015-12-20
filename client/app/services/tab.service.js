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
            saveTab: saveTab,
            get: get,
            query: query,
            remove: remove
        };

        function saveTab(tab, listId) {
            return $http.post(
                apiUrl + '/lists/' + listId + '/tabs',
                tab
            ).then(function (response) {
                return response.data;
            });
        }

        function get(tabId, listId) {
            return $http.get(
                apiUrl + '/lists/' + listId + '/tabs/' + tabId
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

        function remove(tabId, listId) {
            return $http.delete(
                apiUrl + '/lists/' + listId + '/tabs/' + tabId
            );
        }
    }
})();
