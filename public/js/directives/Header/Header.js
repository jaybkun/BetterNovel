(function() {
    "use strict";

    angular.module('BN.directives.Header', []).
        directive('bnHeader', [function() {
            return {
                restrict: 'A',
                replace:true,
                templateUrl: '/js/directives/Header/header.html',
                controller: ['$scope', function($scope) {
                    $scope.$on('authLoaded', function() {
                        $scope.user = $scope.main.user;
                    });
                }]
            };
        }]);
})();