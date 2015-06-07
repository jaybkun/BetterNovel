;(function() {
    angular.module('HomeViewModule', []).
        controller('HomeController', ['$scope', '$localStorage', function($scope, $localStorage) {
            $scope.$storage = $localStorage.$default(
                { content: "" }
            );

            $scope.clearContent = function() {
                $localStorage.$reset();
            };

            $scope.wordCount = function() {

            }
        }]);
})();
