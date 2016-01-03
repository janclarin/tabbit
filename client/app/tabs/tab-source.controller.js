(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabSourceController', TabSourceController);

    TabSourceController.$inject = ['$stateParams', '$sce', 'tabService'];

    function TabSourceController($stateParams, $sce, tabService) {
        var vm = this;

        vm.tab = null;
        vm.tabSourceUrl = null;
        vm.tabId = $stateParams.tabId; // Get tab ID from state params.
        vm.listId = $stateParams.listId; // Get list ID from state params. Used to return to list.

        activate();

        function activate() {
            tabService.get(vm.tabId)
                .then(function (tab) {
                    vm.tab = tab;
                    vm.tabSourceUrl = $sce.trustAsResourceUrl(tab.source); // Get trusted the URL with $sce.
                });
        }
    }
})();