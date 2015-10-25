(function () {
    "use strict";

    angular.module('bn.services.SessionService', [])
        .service('Session', ['$rootScope', '$sessionStorage', '$resource', '$q',
            function ($rootScope, $sessionStorage, $resource, $q) {
                var sessionRoute = $resource('/auth');

                this.storage = $sessionStorage.$default({
                    _user: null
                });

                this.checkSession = function () {
                    var deferred = $q.defer();
                    var session = this;
                    sessionRoute.get({}, function (data) {
                        if (data._id !== undefined) {
                            // TODO check session ID matches current session
                            deferred.resolve(data);
                        } else {
                            session.destroy();
                            deferred.reject();
                        }
                    }, function (error) {
                        session.destroy();
                        deferred.reject();
                    });
                    return deferred.promise;
                };

                this.getUser = function () {
                    return this.storage._user;
                };

                this.create = function (user) {
                    this.storage._user = user;
                };

                this.destroy = function () {
                    this.storage._user = null;
                };
            }]);
})();
