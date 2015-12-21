/**
 * List detail controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListDetailController', ListDetailController);

    ListDetailController.$inject = ['$stateParams', '$uibModal', 'listService', 'tabService', 'tabProgressService',
        'tabTypeService', 'userService'];

    function ListDetailController($stateParams, $uibModal, listService, tabService, tabProgressService, tabTypeService,
                                  userService) {
        var vm = this;

        vm.createTabModal = createTabModal;
        vm.saveTab = saveTab;
        vm.list = null;
        vm.listId = $stateParams.listId; // Get list object from state params.
        vm.listOwner = null;
        vm.tabProgresses = [];
        vm.tabTypes = [];
        vm.tabs = [];

        activate();

        function activate() {
            // Get list and list owner information.
            listService.get(vm.listId)
                .then(function (list) {
                    vm.list = list;
                    userService.get(list.ownerId)
                        .then(function (user) {
                            vm.listOwner = user;
                        });
                });

            // Get all tabs for this list.
            tabService.query(vm.listId)
                .then(function (tabs) {
                    vm.tabs = tabs;
                });

            // Get tab progresses.
            tabProgressService.query()
                .then(function (tabProgresses) {
                    vm.tabProgresses = tabProgresses;
                });

            // Get tab types.
            tabTypeService.query()
                .then(function (tabTypes) {
                    vm.tabTypes = tabTypes;
                });
        }

        function getListTabsByProgress(listId, progressId) {
            return tabService.query(listId)
                .then(function (tabs) {
                });
        }

        function getListOwner(ownerId) {
            // Get owner information.
            return userService.get(ownerId)
                .then(function(user) {
                    vm.listOwner = user;
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