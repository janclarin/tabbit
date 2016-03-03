/**
 * Modal controller.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabModalController', TabModalController);

    TabModalController.$inject = ['$uibModalInstance', 'modalContents', 'tab', 'tabProgresses', 'tabTypes', 'awsService'];

    function TabModalController($uibModalInstance, modalContents, tab, tabProgresses, tabTypes, awsService) {
        var vm = this;

        vm.upload = upload;
        vm.confirm = confirm;
        vm.cancel = cancel;
        vm.modalContents = modalContents;
        vm.tabProgresses = tabProgresses;
        vm.tabTypes = tabTypes;
        vm.tab = tab;
        vm.selectedType = (tab.typeId) ? tabTypes[tab.typeId - 1] : tabTypes[0];
        vm.selectedProgress = (tab.progressId) ? tabProgresses[tab.progressId - 1] : tabProgresses[0];
        vm.sourceFile = null;

        /**
         * Uploads a file to AWS S3 and sets tab's source field.
         * @param file The file to be uploaded.
         */
        function upload(file) {
            if (file) {
                awsService.upload(file)
                    .then(function (response) {
                        vm.tab.source = response.config.url.split('?')[0]; // Remove query params.
                    });
            }
        }

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