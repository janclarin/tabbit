/**
 * List detail controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListDetailController', ListDetailController);

    ListDetailController.$inject = ['$stateParams', '$uibModal', 'listService', 'tabService'];

    function ListDetailController($stateParams, $uibModal, listService, tabService) {
        var vm = this;

        vm.createTabModal = createTabModal;
        vm.saveTab = saveTab;
        vm.list = null;
        vm.listId = $stateParams.listId; // Get list object from state params.
        vm.listTabs = {};

        activate();

        function activate() {
            listService.get(vm.listId)
                .then(function(list) {
                    vm.list = list;
                    tabService.query(vm.list.id, { params: { progress: 'learning' } })
                        .then(function(tabs) {
                            vm.listTabs.learning = tabs;
                        });
                    tabService.query(vm.list.id, { params: { progress: 'learned' } })
                        .then(function(tabs) {
                            vm.listTabs.learned = tabs;
                        });
                    tabService.query(vm.list.id, { params: { progress: 'want-to-learn' } })
                        .then(function(tabs) {
                            vm.listTabs.wantToLearn = tabs;
                        });
                });
        }

        function createTabModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/modals/modal-create-tab.html',
                controller: 'ModalController',
                controllerAs: 'vm'
            });

            modalInstance.result
                .then(function(tab) {
                    vm.saveTab(tab, vm.listId);
                });
        }

        function saveTab(tab, listId) {
            return tabService.saveTab(tab, listId)
                .then(function(tab) {
                    if (tab.progress === 'learning') {
                        vm.listTabs.learning.push(tab);
                    } else if (tab.progress === 'learned') {
                        vm.listTabs.learned.push(tab);
                    } else {
                        vm.listTabs.wantToLearn.push(tab);
                    }
                })
                .catch(function(error) {
                });
        }
    }
})();