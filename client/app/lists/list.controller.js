/**
 * List controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$state', '$stateParams', '$uibModal', 'listService'];

    function ListController($state, $stateParams, $uibModal, listService) {
        var vm = this;

        vm.viewList = viewList;
        vm.userId = $stateParams.userId; // Get user's ID from state params.
        vm.selectedListId = null;
        vm.lists = []; // User's lists.
        vm.listTabs = {};

        activate();

        function activate() {
            listService.query(vm.userId)
                .then(function(lists) {
                    vm.lists = lists;
                    var list = vm.lists[0];
                    vm.selectedListId = list.id;
                    $state.go('lists.detail', { listId: list.id });
                });
        }

        /**
         * Displays the list with the specified ID.
         * @param listId The ID of the list to view.
         */
        function viewList(listId) {
            vm.selectedListId = listId;
            $state.go('lists.detail', { listId: listId });
        }

        /**
         * TODO.
         * Opens an instance of the list modal.
         */
        function createListModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/lists/list-modal.html',
                controller: 'ListModalController',
                controllerAs: 'vm'
            });
        }
    }
})();