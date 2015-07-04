(function() {
    "use strict";
    var app = angular.module('BetterNovel', [
        'ui.router',
        'ui.bootstrap',
        'ngResource',
        'ngStorage',
        'BN.controllers',
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
                templateUrl: '/js/controllers/register/register.html',
                controller: 'RegisterController as register'
            }).
            state('home', {
                url: '/',
                templateUrl: '/js/controllers/home/home.html',
                controller: 'HomeController as home'
            }).
            state('profile', {
                url: '/:user',
                templateUrl: '/js/controllers/profile/profile.html',
                controller: 'ProfileController as profile'
            });
    });

    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    app.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        user: 'user'
    });

    app.controller('MainController', ['$scope', '$q', 'AuthService', function($scope, $q, AuthService) {

        $scope.currentUser = null;

        $scope.loadAuth = function() {
            AuthService.load().then(function(auth) {
               if (auth) {
                   $scope.currentUser = auth;
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
