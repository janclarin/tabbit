/**
 * Modal controller.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabModalController', TabModalController);

    TabModalController.$inject = ['$uibModalInstance', 'modalContents', 'tab', 'tabProgresses', 'tabTypes'];

    function TabModalController($uibModalInstance, modalContents, tab, tabProgresses, tabTypes) {
        var vm = this;

        vm.confirm = confirm;
        vm.cancel = cancel;
        vm.modalContents = modalContents;
        vm.tabProgresses = tabProgresses;
        vm.tabTypes = tabTypes;
        vm.tab = tab;
        vm.selectedType = (tab.typeId) ? tabTypes[tab.typeId - 1] : tabTypes[0];
        vm.selectedProgress = (tab.progressId) ? tabProgresses[tab.progressId - 1] : tabProgresses[0];

        function confirm() {
            vm.tab.typeId = vm.selectedType.id;
            vm.tab.progressId = vm.selectedProgress.id;
            $uibModalInstance.close(vm.tab);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();