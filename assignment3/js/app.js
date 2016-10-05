(function(){
    'use strict';

    var app = angular.module('NarrowItDownApp', []);
    app.controller('NarrowItDownController', NarrowItDownController);
    app.service('MenuSearchService', MenuSearchService);
    app.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");
    app.constant('NothingFound', "Nothing Found");
    app.directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.searchTerm = "";
        controller.found = null;
        controller.error = "";

        controller.searchMenuItems = function () {
            controller.found = null; //Empty the list
            MenuSearchService.getMatchedMenuItems(controller.searchTerm)
                .then(function (response) {
                    controller.found = response;
                    controller.error = "";
                })
                .catch(function (error) {
                    controller.error = error;
                });
        };

        controller.removeItem = function (indexToRemove) {
            controller.found.splice(indexToRemove, 1);
            controller.error = (controller.found.length == 0) ? "No more menu items left": "";
        }
    }

    MenuSearchService.$inject = ['$q', '$http', 'ApiBasePath', 'NothingFound']
    function MenuSearchService($q, $http, ApiBasePath, NothingFound) {
        this.getMatchedMenuItems = function (searchTerm) {
            var deferred = $q.defer();
            if (searchTerm == ""){
                deferred.reject(NothingFound);
            }else{
                getMenuItems()
                    .then(function (response) {
                        var menuItems = response.data.menu_items;
                        var foundItems = [];

                        for (var i=0; i < menuItems.length; i++){
                            if ( isInMenuItem(menuItems[i], searchTerm) ){
                                foundItems.push(menuItems[i]);
                            }
                        }

                        if (foundItems.length == 0){
                            deferred.reject(NothingFound);
                        }else{
                            deferred.resolve(foundItems);
                        }
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    });
            }

            return deferred.promise;
        };

        var isInMenuItem = function (menuItem, searchTerm){
            return ( menuItem.description.indexOf(searchTerm) != -1 );
        }

        var getMenuItems = function () {
            return $http({
                        method: "GET",
                        url: (ApiBasePath + "/menu_items.json")
                    });
        }
    }

    function FoundItems () {
        return {
            restrict: "E",
            templateUrl: 'foundItems.html',
            scope: {
              foundItems: '<',
              onRemove: '&',
              error: '<'
            }
        };
    }
})();
