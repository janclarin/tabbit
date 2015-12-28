/**
 * List detail controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListDetailController', ListDetailController);

    ListDetailController.$inject = ['$state', '$stateParams', '$uibModal', 'listService', 'tabService', 'tabProgressService',
        'tabTypeService', 'userService'];

    function ListDetailController($state, $stateParams, $uibModal, listService, tabService, tabProgressService, tabTypeService,
                                  userService) {
        var vm = this;

        vm.viewTabSource = viewTabSource;
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

        /**
         * Opens the source in a new page if the tab has one.
         * @param tab The tab to view the source of.
         */
        function viewTabSource(tab) {
            if (tab.source) {
                // Pass the list ID to know which list to return to.
                $state.go('tabs-source', { listId: vm.listId, tabId: tab.id });
            }
        }

        /**
         * Opens an instance of the tab modal.
         */
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

        /**
         * Saves a tab in the database.
         * @param tab The tab to save.
         * @param listId The ID of the list to add the tab to.
         * @returns {*} A promise.
         */
        function saveTab(tab, listId) {
            return tabService.saveTab(tab, listId)
                .then(function(tab) {
                    vm.tabs.push(tab); // Add the tab to the end of the list.
                });
        }
    }
})();