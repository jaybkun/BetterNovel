(function() {
    "use strict";

    angular.module('BN.Services.AuthService', []).
        service('Session', [function() {
            this.create = function(sessionId, userId, userRole) {
                this.id = sessionId;
                this.userId = user;
                this.roles = userRole;
            };

            this.destroy = function() {
                this.id = null;
                this.userId = null;
                this.roles = null
            };
        }]).
        factory('AuthService', ['$resource', '$q', 'Session', function($resource, $q, Session) {
            var session = $resource('/auth');
            var login = $resource('/auth/login');

            var authService = {};

            authService.session = function() {
                return session.get();
            };

            authService.login = function(credentials) {
                var deferred = $q.defer();
                login.save(credentials, function(user) {
                    Session.create(user.sessionID, user._id, user.roles);
                    deferred.accept(user);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            authService.isAuthenticated = function() {
                return !!Session.user;
            };

            authService.isAuthorized = function(authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }

                if (!authService.isAuthenticate()) {
                    return false;
                }

                var matchingRoles = _.intersection(Session.roles, authorizedRoles);
                return matchingRoles.length >= 1;
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