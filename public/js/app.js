;(function() {
    'use strict';

    var app = angular.module('BetterNovel', [
        'ui.router'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.
            state('home', {
                url: '/home',
                templateUrl: '/views/home/home.html'
            });
    });


})();