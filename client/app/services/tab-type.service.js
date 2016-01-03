/**
 * Tab type service.
 */
(function() {
   'use strict';

    angular
        .module('app')
        .factory('tabTypeService', tabTypeService);

    tabTypeService.$inject = ['$http'];

    function tabTypeService($http) {
        var apiUrl = '/api/v1';

        return {
            get: get,
            query: query
        };

        function get(typeId) {
            return $http.get(
                apiUrl + '/tabs/types/' + typeId
            ).then(function (response) {
                return response.data;
            });
        }

        function query() {
            return $http.get(
                apiUrl + '/tabs/types'
            ).then(function (response) {
                return response.data;
            });
        }
    }
})();
