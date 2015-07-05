(function() {
    "use strict";

    angular.module('BN.directives.Header', []).
        directive('bnHeader', [function() {
            return {
                restrict: 'A',
                replace:true,
                templateUrl: '/js/directives/Header/header.html'
            };
        }]);
})();