/**
 * List detail controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListDetailController', ListDetailController);

    ListDetailController.$inject = ['$state', '$stateParams', '$uibModal', 'listService', 'tabService',
        'tabProgressService', 'tabTypeService', 'userService', 'authService'];

    function ListDetailController($state, $stateParams, $uibModal, listService, tabService, tabProgressService,
                                  tabTypeService, userService, authService) {
        var vm = this;

        vm.createTabModalInstance = createTabModalInstance;
        vm.createTabModal = createTabModal;
        vm.editTabModal = editTabModal;
        vm.deleteTabModal = deleteTabModal;
        vm.saveTab = saveTab;
        vm.editTab = editTab;
        vm.deleteTab = deleteTab;
        vm.isAuthorizedToModify = isAuthorizedToModify;
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
         * Indicates whether or not the user can edit a list and its tabs.
         * @returns {boolean}
         */
        function isAuthorizedToModify() {
            return vm.listOwner && authService.isAuthorized(vm.listOwner.id);
        }

        /**
         * Opens an modal instance and returns its reference.
         * @param isAnimationEnabled Boolean for modal opening animation.
         * @param modalContents Object containing text fields for the modal.
         * @param tab The tab object to apply changes to. Can be an empty object (new tab).
         * @returns {*} Modal instance.
         */
        function createTabModalInstance(isAnimationEnabled, modalContents, tab) {
            return $uibModal.open({
                animation: isAnimationEnabled,
                templateUrl: 'app/tabs/tab-modal.html',
                controller: 'TabModalController',
                controllerAs: 'vm',
                resolve: {
                    modalContents: function () {
                        return modalContents;
                    },
                    tab: function () {
                        return tab;
                    },
                    tabProgresses: function () {
                        return vm.tabProgresses;
                    },
                    tabTypes: function () {
                        return vm.tabTypes;
                    }
                }
            });
        }

        /**
         * Displays a modal for creating a new tab.
         */
        function createTabModal() {
            var modalContents = {
                title: 'Add song',
                confirmText: 'Save'
            };
            var modalInstance = createTabModalInstance(
                true,
                modalContents,
                {}
            );

            modalInstance.result
                .then(function (tab) {
                    return vm.saveTab(tab, vm.listId);
                })
                .catch(function (err) {
                    // TODO: Display error - error saving tab.
                });
        }

        /**
         * Displays a modal for editing a tab.
         * @param tab The tab to edit.
         */
        function editTabModal(tab) {
            var modalContents = {
                title: 'Edit song',
                confirmText: 'Update'
            };
            var modalInstance = createTabModalInstance(
                true,
                modalContents,
                angular.copy(tab) // Copy so changes aren't reflected in the list.
            );

            modalInstance.result
                .then(function (updatedTab) {
                    return vm.editTab(updatedTab);
                })
                .catch(function (err) {
                    // TODO: Handle error.
                });
        }

        /**
         * Displays a confirmation modal for deleting a tab.
         * @param tab The tab to delete.
         */
        function deleteTabModal(tab) {
            var modalInstance = $uibModal.open({
                animation: true,
                size: 'sm',
                templateUrl: 'app/components/confirmation-modal.html',
                controller: 'ConfirmationModalController',
                controllerAs: 'vm',
                resolve: {
                    modalContents: function () {
                        // The modal fields.
                        return {
                            title: 'Are you sure?',
                            body: 'This song will be permanently deleted.',
                            confirmText: 'Delete'
                        };
                    }
                }
            });

            modalInstance.result
                .then(function () {
                    return vm.deleteTab(tab);
                })
                .catch(function (err) {
                    // TODO: Handle error when deleting a tab.
                });
        }

        /**
         * Saves a tab in the database.
         * @param tab The tab to save.
         * @param listId The ID of the list to add the tab to.
         * @returns {*} A promise.
         */
        function saveTab(tab, listId) {
            return tabService.save(tab, listId)
                .then(function (createdTab) {
                    vm.tabs.push(createdTab); // Add the tab to the end of the list.
                });
        }

        /**
         * Updates a tab in the database and updates it in the local list.
         * @param tab The tab with new information.
         * @returns {*} A promise.
         */
        function editTab(tab) {
            return tabService.update(tab)
                .then(function () {
                    // Find the tab and replace it in the list.
                    for (var i = 0; i < vm.tabs.length; i++) {
                        if (vm.tabs[i].id === tab.id) {
                            vm.tabs[i] = tab; // Replace the old tab.
                            break;
                        }
                    }
                });
        }

        /**
         * Deletes a tab in the database and removes it from the local list.
         * @param tab The tab to be deleted.
         * @returns {*} A promise.
         */
        function deleteTab(tab) {
            return tabService.remove(tab.id)
                .then(function () {
                    // Find the tab and remove it from the list.
                    for (var i = 0; i < vm.tabs.length; i++) {
                        if (vm.tabs[i].id === tab.id) {
                            vm.tabs.splice(i, 1); // Remove the tab locally.
                            break;
                        }
                    }
                });
        }
    }
})();