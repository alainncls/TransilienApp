'use strict';

angular.module('Transilien')
    .controller('PricesCtrl', ["$scope", "$http", "$location", function ($scope, $http, $location) {
        var urlJSON = 'https://ressources.data.sncf.com/api/records/1.0/search?dataset=tarif-abonnements-ile-de-france';

        $http.get(urlJSON + '&rows=32&start=0').success(function (data) {
            $scope.prices = data.records;
            $scope.prices.forEach(format, $scope.prices);
        });

        function format(element,index){
            this[index] = element.fields;
        }
    }]);