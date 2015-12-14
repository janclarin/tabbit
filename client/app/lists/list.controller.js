/**
 * List controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$location', 'listService', 'tabService'];

    function ListController($location, listService, tabService) {
        var vm = this;

        vm.postTab = postTab;
        vm.getList = getList;
        vm.getListTabs = getListTabs;
        vm.list = null; // TODO: Get user ID from route.
        vm.listTabs = {};

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

        function postTab(tab, listId) {
            vm.listTabs.push(tab);
            // TODO: Add tab to list. If error posting, remove from local list.
            return tabService.postTab(tab, listId)
                .then(function(response) {
                    // TODO: refresh tab list?
                })
                .catch(function(error) {
                    vm.listTabs.pop(); // Remove added tab?
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