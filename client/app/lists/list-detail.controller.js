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

        function createTabModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/tabs/tab-modal.html',
                controller: 'TabModalController',
                controllerAs: 'vm',
                resolve: {
                    tabProgresses: function () {
                        return vm.tabProgresses;
                    },
                    tabTypes: function () {
                        return vm.tabTypes;
                    }
                }
            });

            modalInstance.result
                .then(function(tab) {
                    vm.saveTab(tab, vm.listId);
                });
        }

        function saveTab(tab, listId) {
            return tabService.saveTab(tab, listId)
                .then(function(tab) {
                    vm.tabs.push(tab); // Add the tab to the end of the list.
                })
                .catch(function(error) {
                });
        }
    }
})();