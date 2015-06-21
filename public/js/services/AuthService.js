(function() {
    "use strict";

    angular.module('BN.Services.AuthService', []).
        factory('AuthService', ['$resource', '$q', function($resource, $q) {
            var auth = $resource('/api/v1/auth');
            var login = $resource('/api/v1/auth/login');
            var logout = $resource('/api/v1/auth/logout');
            var register = $resource('/api/v1/auth/register');

            return {
                load: function() {
                    var deferred = $q.defer();
                    auth.get({}, function(data) {
                        deferred.resolve(data);
                    },function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                logout: function() {
                    var deferred = $q.defer();
                    logout.get({}, function() {
                        deferred.resolve({success:true});
                    });
                    return deferred.promise;
                },
                login: function(username, password) {
                    var deferred = $q.defer();
                    login.save({username: username, password:password}, function(data) {
                        deferred.resolve(data);
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                register: function(registerObj) {
                    var deferred = $q.defer();
                    register.save(registerObj, function(data) {
                       deferred.resolve(data.user);
                    }, function(error) {
                       deferred.reject(error);
                    });
                    return deferred.promise;
                }
            };
        }]);
})();