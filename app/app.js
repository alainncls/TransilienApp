'use strict';

// Declare app level module which depends on views, and components
angular.module('Transilien', [
    'ngRoute',
    'uiGmapgoogle-maps'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/tf-about', {
                templateUrl: 'home/home.html#tf-about',
                controller: 'HomeCtrl'
            })
            .when('/tf-team', {
                templateUrl: 'home/home.html#tf-team',
                controller: 'HomeCtrl'
            })
            .otherwise({redirectTo: '/'});
    }]);