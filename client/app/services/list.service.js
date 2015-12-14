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
            getList: getList,
            getLists: getLists
        };

        function getList(userId, listId) {
            return $http.get(
                apiUrl + '/users/' + userId + '/lists/' + listId
            );
        }

        function getLists(userId) {
            return $http.get(
                apiUrl + '/users/' + userId + '/lists'
            );
        }
    }
})();
