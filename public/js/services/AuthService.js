(function () {
    "use strict";

    angular.module('bn.services.AuthService', []).
        factory('AuthService', ['$rootScope', '$resource', '$q', 'Session', 'AUTH_EVENTS',
            function ($rootScope, $resource, $q, Session, AUTH_EVENTS) {

                var loginRoute = $resource('/auth/login');
                var logoutRoute = $resource('/auth/logout');
                var registerRoute = $resource('/auth/register');

                function login(credentials) {
                    var deferred = $q.defer();
                    loginRoute.save(credentials, function (user) {
                        if (user.error) {
                            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                            deferred.reject(user.error);
                        } else {
                            Session.create(user);
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            deferred.resolve(user);
                        }
                    }, function (err) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                        deferred.reject(err);
                    });
                    return deferred.promise;
                }

                function logout() {
                    var deferred = $q.defer();
                    logoutRoute.save({}, function () {
                        Session.destroy();
                        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                        deferred.resolve();
                    });
                    return deferred.promise;
                }

                function isLoggedIn() {
                    return !!Session.getUser();
                }

                function isAuthorized(authorizedRoles) {
                    if (!angular.isArray(authorizedRoles)) {
                        authorizedRoles = [authorizedRoles];
                    }

                    if (_.contains(authorizedRoles, '*')) {
                        return true;
                    }

                    var matchingRoles = _.intersection(Session.roles, authorizedRoles);
                    return matchingRoles.length >= 1;
                }

                function register(credentials) {
                    var deferred = $q.defer();
                    registerRoute.save(credentials, function (user) {
                        if (user.error !== undefined) {
                            deferred.reject(user.error);
                        } else {
                            Session.create(user);
                            deferred.resolve(user);
                        }
                    });

                    return deferred.promise;
                }

                return ({
                    login: login,
                    logout: logout,
                    register: register,
                    isLoggedIn: isLoggedIn,
                    isAuthorized: isAuthorized
                });

            }]);
})();