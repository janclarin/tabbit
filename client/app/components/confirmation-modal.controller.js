/**
 * Confirmation modal controller.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ConfirmationModalController', ConfirmationModalController);

    ConfirmationModalController.$inject = ['$uibModalInstance', 'modalContents'];

    function ConfirmationModalController($uibModalInstance, modalContents) {
        var vm = this;

        vm.confirm = confirm;
        vm.cancel = cancel;
        vm.modalTitle = modalContents.title;
        vm.modalBody = modalContents.body;
        vm.modalConfirmText = modalContents.confirmText;

        function confirm() {
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();