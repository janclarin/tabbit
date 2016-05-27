/**
 * Verify email header directive.
 */
(function () {
    'use strict';

    /**
     * @desc Prompts the user to verify their email if unverified.
     * @example <div verify-email></div>
     */
    angular
        .module('app')
        .directive('verifyEmail', verifyEmail);
    
    function verifyEmail() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/verify-email.directive.html',
            scope: {
            },
            controller: VerifyEmailController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return directive;
    }
    
    VerifyEmailController.$inject = ['authService'];
    
    function VerifyEmailController(authService) {
        var vm = this;

        vm.resendVerificationEmail = resendVerificationEmail;
        vm.isVisible = authService.isLoggedIn() && !authService.isEmailVerified();
        vm.message = 'Please verify your email address.';
        vm.buttonText = 'Resend';
        
        function resendVerificationEmail() {
            // TODO: Create an email service. 
            vm.message = 'Verification email sent.';
        }
    }
})();