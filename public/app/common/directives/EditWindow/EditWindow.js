(function () {
    'use strict';

    angular.module('bn.directives.EditWindow', []).
        directive('editWindow', function () {
            return {
                restrict: 'E',
                scope: {
                    content: '=',
                    editable: '='
                },
                template: '<div>' +
                '<div class="display" contenteditable="true" ng-model="content">{{content}}</div>' +
                '<textarea ng-hide="true" ng-model="content"></textarea>' +
                '<input type="hidden" tabindex="-1"/>' +
                '</div>',
                link: function (scope, element, attr) {
                    scope.update = function () {
                        var display = element.find('div.display');
                        display.html(scope.content);
                    };
                },
                controller: ['$scope', '$localStorage', function ($scope, $localStorage) {
                    $scope.$storage = $localStorage.$default({
                        content: "",
                        editable: true
                    });

                    $scope.$watch('content', function () {
                        $scope.update();
                    });

                    $scope.characterCount = function () {
                        //return content.length;
                    };

                    $scope.wordCount = function () {
                        //return content.split(" ").length;
                    };
                }]
            };
        });
})();
