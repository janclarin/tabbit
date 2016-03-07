/**
 * List controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$state', '$stateParams', '$uibModal', 'listService', 'authService'];

    function ListController($state, $stateParams, $uibModal, listService, authService) {
        var vm = this;

        vm.createListModalInstance = createListModalInstance;
        vm.createListModal = createListModal;
        vm.editListModal = editListModal;
        vm.deleteListModal = deleteListModal;
        vm.saveList = saveList;
        vm.editList = editList;
        vm.deleteList = deleteList;
        vm.viewList = viewList;
        vm.isAuthorizedToModify = isAuthorizedToModify;
        vm.userId = $stateParams.userId; // Get user's ID from state params.
        vm.selectedListId = null;
        vm.lists = []; // User's lists.
        vm.listTabs = {};

        activate();

        function activate() {
            listService.query(vm.userId)
                .then(function(lists) {
                    vm.lists = lists;
                    if (vm.lists.length > 0) {
                        if (!vm.selectedListId) {
                            var list = vm.lists[0];
                            vm.selectedListId = list.id; // Set selected list by default.
                        }
                        $state.go('lists.detail', { listId: list.id });
                    } else {
                        // TODO: Handle no lists.
                    }
                });
        }

        /**
         * Indicates whether or not the list can be edited by the logged in user.
         * @param list list to modify.
         * @returns {boolean} Indicates if the user is authorized to modify the list.
         */
        function isAuthorizedToModify(list) {
            return authService.isAuthorized(list.ownerId);
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
         * Opens an modal instance and returns its reference.
         * @param isAnimationEnabled Boolean for modal opening animation.
         * @param modalContents Object containing text fields for the modal.
         * @param list The list object to apply changes to. Can be an empty object (new list).
         * @returns {*} Modal instance.
         */
        function createListModalInstance(isAnimationEnabled, modalContents, list) {
            return $uibModal.open({
                animation: isAnimationEnabled,
                templateUrl: 'app/lists/list-modal.html',
                controller: 'ListModalController',
                controllerAs: 'vm',
                resolve: {
                    modalContents: function () {
                        return modalContents;
                    },
                    list: function () {
                        return list;
                    }
                }
            });
        }

        /**
         * TODO: Combine this method with edit.
         * Displays a modal for creating a new list.
         */
        function createListModal() {
            var modalContents = {
                title: 'Add list',
                confirmText: 'Save'
            };
            var modalInstance = createListModalInstance(true, modalContents, {});

            modalInstance.result
                .then(function (list) {
                    return vm.saveList(list, vm.userId);
                })
                .catch(function (err) {
                    // TODO: Display error.
                });
        }

        /**
         * Displays a modal for editing a list.
         * @param list The list to edit.
         */
        function editListModal(list) {
            var modalContents = {
                title: 'Edit list',
                confirmText: 'Update'
            };
            var modalInstance = createListModalInstance(
                true,
                modalContents,
                angular.copy(list) // Copy so changes aren't reflected in the list.
            );

            modalInstance.result
                .then(function (updatedList) {
                    return vm.editList(updatedList);
                })
                .catch(function (err) {
                    // TODO: Display error.
                });
        }

        /**
         * Displays a confirmation modal for deleting a list.
         * @param list
         */
        function deleteListModal(list) {
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
                            body: 'This list will be permanently deleted.',
                            confirmText: 'Delete'
                        };
                    }
                }
            });

            modalInstance.result
                .then(function () {
                    return vm.deleteList(list);
                })
                .catch(function (err) {
                    // TODO: Handle error when deleting a list.
                });
        }

        /**
         * Saves a list in the database.
         * @param list The list to save.
         * @param userId The ID of the user who owns the list.
         * @returns {*} A promise.
         */
        function saveList(list, userId) {
            return listService.save(list, userId)
                .then(function (createdList) {
                    vm.lists.push(createdList); // Add the new list to the list of lists.
                });
        }

        /**
         * Updates a list in the database and updates it in in the local list.
         * @param list The list with new information.
         * @returns {*} A promise.
         */
        function editList(list) {
            return listService.update(list)
                .then(function () {
                    // Find the list and replace it in the list.
                    for (var i = 0; i < vm.lists.length; i++) {
                        if (vm.lists[i].id === list.id) {
                            vm.lists[i] = list; // Replace the old list.
                            break;
                        }
                    }
                });
        }

        /**
         * Deletes a list in the database and removes it from the local list.
         * @param list The list to be deleted.
         * @returns {*} A promise.
         */
        function deleteList(list) {
            return listService.remove(list.id)
                .then(function () {
                    // Find the list and remove it from the list.
                    for (var i = 0; i < vm.lists.length; i++) {
                        if (vm.lists[i].id === list.id) {
                            vm.lists.splice(i, 1); // Remove the list locally.
                            break;
                        }
                    }
                });
        }
    }
})();