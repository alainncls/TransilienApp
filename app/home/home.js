'use strict';

angular.module('Transilien')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .service('anchorSmoothScroll', function () {
        this.scrollTo = function (eID) {

            // This scrolling function is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY);
                return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step;
                    if (leapY > stopY) leapY = stopY;
                    timer++;
                }
                return;
            }
            for (var i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step;
                if (leapY < stopY) leapY = stopY;
                timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                }
                return y;
            }
        };
    })

    .controller('HomeCtrl', ["$scope", "$http", "$location", "anchorSmoothScroll", function ($scope, $http, $location, anchorSmoothScroll) {
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

        $scope.gotoElement = function (eID) {
            // set the location.hash to the id of the element you wish to scroll to.
            $location.hash(eID);

            // call $anchorScroll()
            anchorSmoothScroll.scrollTo(eID);

        };
    }]);