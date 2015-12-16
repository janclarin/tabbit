/**
 * Modal controller.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$uibModalInstance'];

    function ModalController($uibModalInstance) {
        var vm = this;

        vm.confirm = confirm;
        vm.cancel = cancel;

        function confirm() {
            $uibModalInstance.close(vm.modalForm);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();