/**
 * Tab progress service.
 */
(function() {
   'use strict';

    angular
        .module('app')
        .factory('tabProgressService', tabProgressService);

    tabProgressService.$inject = ['$http'];

    function tabProgressService($http) {
        var apiUrl = '/api/v1';

        return {
            get: get,
            query: query
        };

        function get(progressId) {
            return $http.get(
                apiUrl + '/tabs/progresses/' + progressId
            ).then(function (response) {
                return response.data;
            });
        }

        function query() {
            return $http.get(
                apiUrl + '/tabs/progresses'
            ).then(function (response) {
                return response.data;
            });
        }
    }
})();
