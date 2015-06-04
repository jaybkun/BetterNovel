;(function() {
    'use strict';

    var app = angular.module('BetterNovel', [
        'ui.router',
        'ui.bootstrap',
        'ngStorage',
        'BetterNovelViews',
        'BN.Directives'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.
            state('home', {
                url: '/home',
                templateUrl: '/views/home/home.html',
                controller: 'HomeController'
            }).
            state('profile', {
                url: '/profile',
                templateUrl: '/views/profile/profile.html',
                controller: 'ProfileController'
            });
    });


})();