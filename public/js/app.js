(function () {
    "use strict";

    var app = angular.module('BetterNovel', [
        'ui.router',
        'ui.bootstrap',
        'ngResource',
        'ngStorage',
        'bn.controllers',
        'bn.directives',
        'bn.services'
    ]);

    app.run(['$rootScope', '$state', 'AUTH_EVENTS', 'AuthService', 'Session',
        function ($rootScope, $state, AUTH_EVENTS, AuthService, Session) {

            $rootScope.currentUser = Session.getUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, params) {
                $rootScope.currentUser = Session.getUser();
            });

            $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, params) {
                $rootScope.currentUser = null;
                $state.go('home');
            });

            $rootScope.$on('$stateChangeStart', function (event, toState, toParam, fromState, fromParams) {

                Session.checkSession();
                if (toState.data.authorizedRoles === undefined) {
                    event.preventDefault();
                    return;
                }

                var authorizedRoles = toState.data.authorizedRoles;

                if (!AuthService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    $state.go('home');
                }
            });
        }]);

    app.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('home', {
                url: '/',
                templateUrl: '/js/controllers/home/home.html',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            }).
            state('register', {
                url: '/register',
                templateUrl: '/js/controllers/register/register.html',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            }).
            state('profile', {
                url: '/:user',
                templateUrl: '/js/controllers/profile/profile.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
                }
            });
    }]);

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

})();
