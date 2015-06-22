(function() {
    "use strict";
    var app = angular.module('BetterNovel', [
        'ui.router',
        'ui.bootstrap',
        'ngResource',
        'ngStorage',
        'formly',
        'formlyBootstrap',
        'BN.Views',
        'BN.Directives',
        'BN.Services'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('root', {
                url: '/',
                abstract: true,
                controller: 'MainController as main'
            }).
            state('register', {
                url: '/register',
                templateUrl: '/views/register/register.html',
                controller: 'RegisterController as register'
            }).
            state('home', {
                url: '/',
                templateUrl: '/views/home/home.html',
                controller: 'HomeController as home'
            }).
            state('profile', {
                url: '/:user',
                templateUrl: '/views/profile/profile.html',
                controller: 'ProfileController as profile'
            });
    });

    app.controller('MainController', ['$scope', '$q', 'AuthService', function($scope, $q, AuthService) {
        $scope.main = {
            user: {},
            credentials: {}
        };

        $scope.loadAuth = function() {
            AuthService.load().then(function(auth) {
               if (auth) {
                   $scope.main.user = auth;
                   $scope.$broadcast('authLoaded');
               }
            });
        };

        $scope.login = function() {
            AuthService.login({
                username: $scope.main.credentials.username,
                password: $scope.main.credentials.password
            }).then(function(data) {
                if (data.error) {
                    $scope.loginErrorMessage = data.error;
                } else {
                    $scope.loadAuth();
                    $scope.main.credentials = {};
                }
            });
        };

        $scope.logout = function() {
            AuthService.logout();
            delete $scope.main.user;
        };

        $scope.loadAuth();
    }]);

})();
