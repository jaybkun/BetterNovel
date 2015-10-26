(function () {
    "use strict";

    angular.module('bn.directives.LoginModal', []).
        directive('loginModal', ['AUTH_EVENTS', function (AUTH_EVENTS) {
            return {
                restrict: 'E',
                replace: true,
                scope: false,
                templateUrl: '/app/common/directives/LoginModal/LoginModal.html',
                link: function (scope, elem, attr) {
                    scope.$on(AUTH_EVENTS.loginSuccess, function () {
                        elem.modal('hide');
                    });
                },
                controller: ['$scope', '$state', '$timeout', 'AuthService', 'AUTH_EVENTS',
                    function ($scope, $state, $timeout, AuthService, AUTH_EVENTS) {
                        $scope.credentials = {
                            email: null,
                            password: null
                        };

                        $scope.login = function () {
                            AuthService.login($scope.credentials).
                                then(function () {
                                    $scope.credentials.email = null;
                                    $scope.$broadcast(AUTH_EVENTS.loginSuccess);
                                    $state.go('home');
                                }).
                                catch(function (error) {
                                    $scope.$broadcast(AUTH_EVENTS.loginFailed);
                                    $scope.loginErrorMessage = error;
                                }).
                                finally(function () {
                                    $scope.credentials.password = null;
                                });
                        };
                    }]
            };
        }]);
})();


