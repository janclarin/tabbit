/**
 * List controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$location', '$uibModal', 'listService', 'tabService'];

    function ListController($location, $uibModal, listService, tabService) {
        var vm = this;

        vm.createTabModal = createTabModal;
        vm.postTab = postTab;
        vm.getList = getList;
        vm.getListTabs = getListTabs;
        vm.list = null; // TODO: Get user ID from route.
        vm.listTabs = {};

        // Populate the list with a hard-coded User ID.
        // TODO: Grab the logged-in user's ID.
        getList(1)
            .then(function(list) {
                vm.list = list;
                getListTabs(vm.list.id, { params: { progress: 'learning' } })
                    .then(function(response) {
                        vm.listTabs.learning = response.data;
                    });
                getListTabs(vm.list.id, { params: { progress: 'learned' } })
                    .then(function(response) {
                        vm.listTabs.learned = response.data;
                    });
                getListTabs(vm.list.id, { params: { progress: 'want-to-learn' } })
                    .then(function(response) {
                        vm.listTabs.wantToLearn = response.data;
                    });
            });

        function createTabModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/modals/modal-create-tab.html',
                controller: 'ModalController',
                controllerAs: 'vm'
            });

            modalInstance.result
                .then(function(tab) {
                    vm.postTab(tab, vm.list.id);
                });
        }

        function postTab(tab, listId) {
            return tabService.postTab(tab, listId)
                .then(function(response) {
                    var newTab = response.data.data;
                    if (newTab.progress === 'learning') {
                        vm.listTabs.learning.push(newTab);
                    } else if (newTab.progress === 'learned') {
                        vm.listTabs.learned.push(newTab);
                    } else {
                        vm.listTabs.wantToLearn.push(newTab);
                    }
                })
                .catch(function(error) {
                });
        }

        function getList(userId) {
            return listService.getLists(userId)
                .then(function(response) {
                    return response.data.data[0]; // First list
                })
                .catch(function(error) {
                    vm.list = null;
                });
        }

        function getListTabs(listId, params) {
            return tabService.getTabs(listId, params)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    vm.listTabs = [];
                });
        }
    }
})();