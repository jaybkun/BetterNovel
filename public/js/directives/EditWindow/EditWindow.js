;(function () {
    'use strict';

    angular.module('BN.directives.EditWindow', []).
        directive('editWindow', function() {
            return {
                restrict: 'E',
                scope: {
                    content: '=',
                    editable: '='
                },
                template:'<div contentEditable="{{editable}}"></div>',
                link: function(scope, element, attr) {

                },
                controller: ['$scope', '$localStorage', function($scope, $localStorage) {
                    $scope.$storage = $localStorage.$default(
                        {
                            content: "",
                            editable: true
                        }
                    );

                    $scope.characterCount = function() {
                        return content.length;
                    };

                    $scope.wordCount = function() {
                        return content.split(" ").length;
                    }
                }]

            };
        });
})();
