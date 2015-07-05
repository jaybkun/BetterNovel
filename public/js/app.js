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

    app.run(['$rootScope', 'AUTH_EVENTS', 'AuthService', function($rootScope, AUTH_EVENTS, AuthService) {
        $rootScope.$on('$stateChangeStart', function (event, next) {

            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        });
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function($stateProvider, $urlRouterProvider, USER_ROLES) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('root', {
                url: '/',
                abstract: true,
                controller: 'MainController as main',
                resolve: {
                    auth: function resolveAuthentication(AuthResolver) {
                        return AuthResolver.resolve();
                    }
                }
            }).
            state('home', {
                url: '/home',
                templateUrl: '/js/controllers/home/home.html',
                controller: 'HomeController as home',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
                },
                resolve: {
                    auth: function resolveAuthentication(AuthResolver) {
                        return AuthResolver.resolve();
                    }
                }
            }).
            state('register', {
                url: '/register',
                templateUrl: '/js/controllers/register/register.html',
                controller: 'RegisterController as register',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            }).
            state('profile', {
                url: '/:user',
                templateUrl: '/js/controllers/profile/profile.html',
                controller: 'ProfileController as profile',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
                }
            });
    }]);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    });

    app.factory('AuthInterceptor', function ($rootScope, $q,
                                              AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
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

    app.controller('MainController', ['$scope', '$state', 'AuthService', 'USER_ROLES', function($scope, $state, AuthService, USER_ROLES) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };

        $scope.logout = function() {
            AuthService.logout().
                then(function() {
                    $scope.setCurrentUser(null);
                    $state.go('home');
                });
        }
    }]);
})();
