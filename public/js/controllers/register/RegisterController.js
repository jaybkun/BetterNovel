(function() {
    'use strict';

    angular.module('BN.controllers.register', []).
        controller('RegisterController', ['$scope', '$localStorage', 'AuthService', '$state', function ($scope, $localStorage, AuthService, $state) {
            $scope.registration = {};
            $scope.errorMessage = '';

            $scope.registerUser = function() {
                AuthService.register($scope.registration).
                then(function(data) {
                    if (data.error) {
                        $scope.errorMessage = data.error;
                    } else {
                        $scope.loadAuth();
                        $state.go('home');
                    }
                });
            };

            $scope.passwordMatch = function() {
                return ($scope.registration.password === $scope.registration.passwordConf);
            };
        }]);
})();
