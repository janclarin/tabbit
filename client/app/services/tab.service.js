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
            postTab: postTab,
            getTab: getTab,
            getTabs: getTabs,
            deleteTab: deleteTab
        };

        function postTab(tab, listId) {
            return $http.post(
                apiUrl + '/lists/' + listId + '/tabs',
                tab
            );
        }

        function getTab(tabId, listId) {
            return $http.get(
                apiUrl + '/lists/' + listId + '/tabs/' + tabId
            );
        }

        function getTabs(listId, params) {
            return $http.get(
                apiUrl + '/lists/' + listId + '/tabs',
                params
            );
        }

        function deleteTab(tabId, listId) {
            return $http.delete(
                apiUrl + '/lists/' + listId + '/tabs/' + tabId
            );
        }
    }
})();
