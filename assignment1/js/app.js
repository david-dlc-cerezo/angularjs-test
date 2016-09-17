(function(){
    'use strict';

    var app = angular.module('LunchCheck', []);
    app.controller('LunchCheckController', LunchCheckController);

    app.$inject = ['$scope'];
    function LunchCheckController($scope){
        $scope.dishes = "";
        $scope.message = "";
        $scope.extra_classes = "";

        $scope.countDishes = function () {
            var dishes_array = $scope.dishes.split(',');
            return dishes_array.length;
        }

        $scope.isTooMuch = function () {
            var limit = 3;
            return ($scope.countDishes() > limit);
        }

        $scope.checkAndUpdateMsg = function () {
            if ($scope.dishes.trim() === "") {
                $scope.message = "Please enter data first";
                $scope.extra_classes = "alert alert-danger";
            } else if ($scope.isTooMuch()){
                $scope.message = "Too much!";
                $scope.extra_classes = "alert alert-success";
            }else{
                $scope.message = "Enjoy!";
                $scope.extra_classes = "alert alert-success";
            }
        }
    }
})();
