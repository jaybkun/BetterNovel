;(function () {
    'use strict';

    angular.module('BN.directives.EditWindow', []).
        directive('editWindow', function() {
            return {
                restrict: 'E',
                templateUrl: '/js/directives/EditWindow/editWindow.html'

            };
        });
})();
