(function() {
    'use strict';

    angular.module('BN.controllers.register', []).
        controller('RegisterController', ['$scope', '$localStorage', 'AuthService', '$state', function ($scope, $localStorage, AuthService, $state) {
            $scope.registration = {};
            $scope.errorMessage = '';

            $scope.registerUser = function() {
                $scope.errorMessage = '';

                AuthService.register($scope.registration).
                then(function(user) {
                    $scope.setCurrentUser(user);
                    $state.go('home');
                }).
                catch(function(error) {
                    $scope.errorMessage = error;
                    $scope.registration.password = '';
                    $scope.registration.passwordConf = '';
                });
            };

            $scope.passwordMatch = function() {
                return ($scope.registration.password === $scope.registration.passwordConf);
            };
        }]);
})();
