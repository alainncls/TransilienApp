'use strict';

angular.module('Transilien')
    .controller('PricesCtrl', ["$scope", "$http", function ($scope, $http) {
        var urlJSON = 'https://ressources.data.sncf.com/api/records/1.0/search?dataset=tarif-abonnements-ile-de-france';

        $http.get(urlJSON + '&rows=32&start=0').success(function (data) {
            $scope.prices = data.records;
        });

        $scope.getMin = function (first,second){
            //var value = parseFloat(second.replace(',', '.'));
            //console.log(value);
            //if(first == undefined) {
            //    var s = second.replace(".", ",");
            //    return s;
            //}
            ////console.log(f + " - " + s);
            //var f = first.replace(".", ",");
            //var s = second.replace(".", ",");
            //return Math.min(f, s);
        }
    }]);