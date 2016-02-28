/**
 * AWS service.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('awsService', awsService);

    awsService.$inject = ['$http', 'Upload'];

    function awsService($http, Upload) {
        return {
            upload: upload,
            getSignedUrl: getSignedUrl
        };

        /**
         * Uploads a file using an AWS S3 signed URL from the server.
         * @param file
         * @param signedUrl
         * @returns {*}
         */
        function upload(file, signedUrl) {
            return Upload.http({
                method: 'PUT',
                url: signedUrl,
                headers: {
                    'Content-Type': file.type !== '' ? file.type : 'application/octet-stream'
                },
                data: file
            });
        }

        /**
         * Gets an AWS S3 signed URL for the specified file.
         * @param file The file to upload.
         * @returns {*}
         */
        function getSignedUrl(file) {
            return $http.get(
                '/signedUrlS3', {
                    params: {
                        fileName: file.name,
                        fileType: file.type
                    }
                }
            ).then(function (response) {
                return response.data;
            });
        }
    }
})();