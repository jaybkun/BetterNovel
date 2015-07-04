(function() {
    "use strict";

    angular.module('BN.Services.AuthService', []).
        factory('AuthService', ['$resource', '$q', function($resource, $q) {
            var auth = $resource('/auth');
            var login = $resource('/auth/login');
            var logout = $resource('/auth/logout');
            var register = $resource('/auth/register');

            return {
                load: function() {
                    return auth.get().$promise.then(function(user) {
                        return user._id ? user : null;
                    });
                },
                logout: function() {
                    logout.save();
                },
                login: function(credentials) {
                    var deferred = $q.defer();
                    login.save({email: credentials.email, password: credentials.password}, function(data) {
                        deferred.resolve(data);
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                register: function(registerObj) {
                    var deferred = $q.defer();
                    register.save(registerObj, function(data) {
                       deferred.resolve(data);
                    }, function(error) {
                       deferred.reject(error);
                    });
                    return deferred.promise;
                }
            };
        }]);
})();