(function() {
    "use strict";

    angular.module('BN.directives.LoginModal', []).
        directive('loginModal', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/directives/LoginModal/LoginModal.html',
                link: function(scope, element, attr) {
                    element.on('hidden.bs.modal', function() {
                        delete scope.main.credentials;
                        delete scope.loginErrorMessage;
                    });
                }
            };
        });
})();


