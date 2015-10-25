(function () {
    'use strict';

    angular.module('bn.controllers.register', []).
        controller('RegisterController', ['$scope', '$localStorage', 'AuthService', '$state', function ($scope, $localStorage, AuthService, $state) {
            $scope.registration = {};
            $scope.errorMessage = '';

            $scope.registerUser = function () {
                $scope.errorMessage = '';

                AuthService.register($scope.registration).
                    then(function (user) {
                        $state.go('home');
                    }).
                    catch(function (error) {
                        $scope.errorMessage = error;
                    }).
                    finally(function () {
                        $scope.registration.password = null;
                        $scope.registration.passwordConf = null;
                    });
            };

            $scope.passwordMatch = function () {
                //return ($scope.registration.password === $scope.registration.passwordConf);
                return true;
            };
        }]);
})();
