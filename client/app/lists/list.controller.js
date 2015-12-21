/**
 * List controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$state', '$stateParams', 'listService'];

    function ListController($state, $stateParams, listService) {
        var vm = this;

        vm.userId = $stateParams.userId; // Get user's ID from state params.
        vm.lists = []; // User's tabs.
        vm.listTabs = {};

        activate();

        function activate() {
            listService.query(vm.userId)
                .then(function(lists) {
                    vm.lists = lists;
                    var list = vm.lists[0];
                    $state.go('lists-detail', { listId: list.id });
                });
        }
    }
})();