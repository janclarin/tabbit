/**
 * List modal controller.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListModalController', ListModalController);

    ListModalController.$inject = ['$uibModalInstance', 'modalContents', 'list'];

    function ListModalController($uibModalInstance, modalContents, list) {
        var vm = this;

        vm.validate = validate;
        vm.confirm = confirm;
        vm.cancel = cancel;
        vm.modalContents = modalContents;
        vm.list = list;

        function validate(list) {
            if (typeof list.isPrivate === 'undefined') {
                list.isPrivate = false;
            }
        }

        function confirm() {
            vm.validate(vm.list);
            $uibModalInstance.close(vm.list);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();