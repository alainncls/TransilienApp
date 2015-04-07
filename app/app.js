'use strict';

// Declare app level module which depends on views, and components
var trans = angular.module('Transilien', ['ngRoute', 'uiGmapgoogle-maps']);

trans.config(['$routeProvider', function ($routeProvider) {
    //$routeProvider
    //    .when('/', {
    //        templateUrl: 'index.html',
    //        controller: 'HomeCtrl'
    //    })
    //    .when('tf-about', {
    //        templateUrl: 'home/home.html#tf-about',
    //        controller: 'HomeCtrl'
    //    })
    //    .when('tf-team', {
    //        templateUrl: 'home/home.html#tf-team',
    //        controller: 'HomeCtrl'
    //    })
    //    .otherwise({redirectTo: '/'});
}]);

