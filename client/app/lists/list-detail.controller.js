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
        vm.queryTabs = queryTabs;
        vm.list = null;
        vm.listId = $stateParams.listId; // Get list object from state params.
        vm.listTabs = {};

        activate();

        function activate() {
            listService.get(vm.listId)
                .then(function(list) {
                    vm.list = list;
                    queryTabs(vm.list.id, { params: { progress: 'learning' } })
                        .then(function(response) {
                            vm.listTabs.learning = response.data;
                        });
                    queryTabs(vm.list.id, { params: { progress: 'learned' } })
                        .then(function(response) {
                            vm.listTabs.learned = response.data;
                        });
                    queryTabs(vm.list.id, { params: { progress: 'want-to-learn' } })
                        .then(function(response) {
                            vm.listTabs.wantToLearn = response.data;
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

        function queryTabs(listId, params) {
            return tabService.query(listId, params)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    vm.listTabs = [];
                });
        }
    }
})();