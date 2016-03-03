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
            upload: upload
        };

        /**
         * Uploads a file using an AWS S3 signed URL from the server.
         * The file will have a new name with a random string appended to its name.
         * @param file The file to upload.
         * @returns {*}
         */
        function upload(file) {
            var newFileName = createUniqueFileName(file.name);
            file = renameFile(file, newFileName);
            return getSignedUrl(file)
                .then(function (signedUrl) {
                    return putFile(file, signedUrl);
                });
        }

        /**
         * Puts the file into AWS at the specified signed URL.
         * @param file
         * @param signedUrl
         * @returns {*}
         */
        function putFile(file, signedUrl) {
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
         * @returns string Signed URL.
         */
        function getSignedUrl(file) {
            return $http.get(
                '/signedUrlS3', {
                    params: {
                        fileName: file.ngfName || file.name,
                        fileType: file.type
                    }
                }
            ).then(function (response) {
                return response.data.url;
            });
        }

        /**
         * Returns a file with the new name.
         * @param file The file to rename.
         * @param newName The new name to rename the file.
         * @return {file} File with the new name.
         */
        function renameFile(file, newName) {
            return Upload.rename(file, newName);
        }

        /**
         * Creates a "unique" enough file name to store the file as.
         * e.g. filename.pdf -> filename-[random string].pdf
         * @param fileName The file name.
         * @return string|null A "unique" enough file name based on the original. Null otherwise.
         */
        function createUniqueFileName(fileName) {
            if (fileName !== null) {
                var randomString = Math.random().toString(36).slice(2);
                var lastPeriodIndex = fileName.lastIndexOf('.');
                var name = fileName.substr(0, lastPeriodIndex);
                var extension = fileName.substr(lastPeriodIndex);
                return name + '-' + randomString + extension;
            }
            return null;
        }
    }
})();