(function () {
    "use strict";

    angular.module('BN.directives.Header', []).
        directive('bnHeader', [function () {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: '/js/directives/Header/header.html',
                controller: ['$scope', 'AuthService', function($scope, AuthService) {
                    $scope.logout = function() {
                        AuthService.logout().then(function() {
                            console.log('logged out');
                        });
                    };
                }]
            };
        }]);
})();