'use strict';

angular.module('Transilien')
    .controller('PricesCtrl', ["$scope", "$http", function ($scope, $http) {
        var urlJSON = 'https://ressources.data.sncf.com/api/records/1.0/search?dataset=tarif-abonnements-ile-de-france';

        $http.get(urlJSON + '&rows=32&start=0').success(function (data) {
            $scope.prices = data.records;
        });

        $scope

        $scope.getPrice = function (first, second){
            var s = parseFloat(second);

            if(first === undefined) {
                return s;
            }

            var f = parseFloat(first);
            return f;
        }
    }]);