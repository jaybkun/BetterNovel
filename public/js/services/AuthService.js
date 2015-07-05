(function () {
    "use strict";

    angular.module('BN.Services.AuthService', []).
        service('Session', [function () {
            this.create = function (sessionId, userId, userRole) {
                this.id = sessionId;
                this.userId = userId;
                this.roles = userRole;
            };

            this.destroy = function () {
                this.id = null;
                this.userId = null;
                this.roles = null;
            };
        }]).
        factory('AuthService', ['$resource', '$q', 'Session', function ($resource, $q, Session) {
            var session = $resource('/auth');
            var login = $resource('/auth/login');
            var logout = $resource('/auth/logout');
            var register = $resource('/auth/register');

            var authService = {};

            authService.session = function () {
                return session.get();
            };

            authService.logout = function() {
                Session.destroy();
                return logout.save();
            };

            authService.login = function (credentials) {
                var deferred = $q.defer();
                login.save(credentials, function (user) {
                    if (user.error) {
                        deferred.reject(user.error);
                    } else {
                        Session.create(user.sessionID, user._id, user.roles);
                        deferred.resolve(user);
                    }
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            authService.isAuthenticated = function () {
                return !!Session.user;
            };

            authService.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }

                if (_.contains(authorizedRoles, '*')) {
                    return true;
                }

                if (!authService.isAuthenticated()) {
                    return false;
                }

                var matchingRoles = _.intersection(Session.roles, authorizedRoles);
                return matchingRoles.length >= 1;
            };

            authService.register = function(credentials) {
                var deferred = $q.defer();
                register.save(credentials, function(user) {
                    if (user.error) {
                        deferred.reject(user.error);
                    } else {
                        Session.create(user.sessionId, user._id, user.roles);
                        deferred.resolve(user);
                    }
                });

                return deferred.promise;
            };

            return authService;
        }]).
        factory('AuthResolver', function ($q, $rootScope, $state) {
            return {
                resolve: function () {
                    var deferred = $q.defer();
                    var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
                        if (angular.isDefined(currentUser)) {
                            if (currentUser) {
                                deferred.resolve(currentUser);
                            } else {
                                deferred.reject();
                                $state.go('user-login');
                            }
                            unwatch();
                        }
                    });
                    return deferred.promise;
                }
            };
        });
})();