/**
 * Modal controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('TabModalController', TabModalController);

    TabModalController.$inject = ['$uibModalInstance', 'tabProgresses', 'tabTypes'];

    function TabModalController($uibModalInstance, tabProgresses, tabTypes) {
        var vm = this;

        vm.confirm = confirm;
        vm.cancel = cancel;
        vm.tabProgresses = tabProgresses;
        vm.tabTypes = tabTypes;
        vm.modalForm = {};

        function confirm() {
            $uibModalInstance.close(vm.modalForm);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();