'use strict';

angular.module('Transilien', ['ngRoute','uiGmapgoogle-maps'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ["$scope", "$http", "$location", function ($scope, $http, $location) {
        var urlJSON = 'https://ressources.data.sncf.com/api/records/1.0/search?dataset=sncf-gares-et-arrets-transilien-ile-de-france';

        $scope.map = {
            center: {
                latitude: 48.853,
                longitude: 2.35
            },
            zoom: 8,
            options: {
                disableDoubleClickZoom:true,
                draggableCursor:'move',
                draggingCursor:'auto',
                keyboardShortcuts:false,
                streetViewControl:false
            }
        };

        $scope.stations = [];

        $http.get(urlJSON + '&rows=30&start=0').success(function (data) {
            $scope.stations = data.records;
            $scope.stations.forEach(format, $scope.stations);
        });

        function format(element,index){
            this[index] = element.fields;
            this[index].recordid = element.recordid;
            this[index].geometry = element.geometry;
        }

        $scope.goTo = function (id) {
            $location.path('/station/' + id);
        };
    }]);