/**
 * Modal controller.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabModalController', TabModalController);

    TabModalController.$inject = ['$uibModalInstance', '$q', 'modalContents', 'tab', 'tabProgresses', 'tabTypes', 'awsService'];

    function TabModalController($uibModalInstance, $q, modalContents, tab, tabProgresses, tabTypes, awsService) {
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
        vm.uploadProgress = null;
        vm.uploadStatus = 'success';

        /**
         * Uploads a file to AWS S3 and sets tab's source field.
         * @param file The file to be uploaded.
         */
        function upload(file) {
            if (file) {
                awsService.upload(file)
                    .then(function (response) {
                        vm.tab.source = response.config.url.split('?')[0]; // Remove query params.
                    }, function (error) {
                        vm.uploadStatus = 'danger';
                    }, function (progress) {
                        vm.uploadProgress = parseInt(100.0 * progress.loaded / progress.total);
                    });
            }
        }

        function confirm() {
            vm.tab.typeId = vm.selectedType.id;
            vm.tab.progressId = vm.selectedProgress.id;
            $uibModalInstance.close(vm.tab);
        }

        function cancel() {
            // TODO: Abort upload?
            $uibModalInstance.dismiss('cancel');
        }
    }
})();