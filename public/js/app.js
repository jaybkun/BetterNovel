(function() {
    "use strict";
    var app = angular.module('BetterNovel', [
        'ui.router',
        'ui.bootstrap',
        'ngResource',
        'ngStorage',
        'BetterNovelViews',
        'BN.Directives',
        'BN.Services'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('root', {
                url: '/',
                abstract: true,
                controller: 'MainController'
            });
        /*
            state('login', {
                url: '/login',
                templateUrl: '/login.html'
            }).
            state('home', {
                url: '/home',
                templateUrl: '/views/home/home.html',
                controller: 'HomeController as home'
            }).
            state('profile', {
                url: '/:user',
                templateUrl: '/views/profile/profile.html',
                controller: 'ProfileController as profile'
            }).
            state('work', {
                url: '/:user/:work',
                template: '/views/work/work.html',
                controller: 'WorkController as work'
            });
            */
    });

    app.controller('MainController', ['$scope', '$q', 'AuthService', function($scope, $q, AuthService) {
        $scope.main = {
            user: {}
        };

        $scope.loadAuth = function() {
            AuthService.load().then(function(auth) {
               if (auth) {
                   $scope.main.user = auth;
                   $scope.$broadcast('authLoaded');
               }
            });
        };

        $scope.loadUser = function(username) {
            //TODO
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

        $scope.registerUser = function() {
            AuthService.register({
                username: $scope.main.credentials.username,
                email: $scope.main.credentials.email,
                password: $scope.main.credentials.password
            }).then(function(data) {
                if (data.error) {
                    //TODO
                } else {
                    //$scope.loadUser();
                }
            });
        };

        $scope.loadAuth();
    }]);

})();
