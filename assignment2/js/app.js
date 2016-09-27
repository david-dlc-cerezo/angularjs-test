(function(){
    'use strict';

    var app = angular.module('ShoppingListCheckOff', []);
    app.controller('AlreadyBoughtController', AlreadyBoughtController);
    app.controller('ToBuyController', ToBuyController);
    app.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var service = ShoppingListCheckOffService;
        console.log(service);

        this.getList = function(){
            return service.alreadyBoughtList.getList();
        }

        this.isListEmpty = function(){
            return service.alreadyBoughtList.isListEmpty();
        }
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var service = ShoppingListCheckOffService;
        console.log(service);

        this.getList = function(){
            return service.toBuyList.getList();
        }

        this.isListEmpty = function(){
            return service.toBuyList.isListEmpty();
        }

        this.markAsBought = function (index){
            service.alreadyBoughtList.addItem( service.toBuyList.getItem(index) );
            service.toBuyList.removeItem(index);
        }
    }

    function ShoppingListCheckOffService(){
        //To buy list
        this.toBuyList = new ShoppingList();
        this.toBuyList.addItem('cookies', 1);
        this.toBuyList.addItem('pasta', 2);
        this.toBuyList.addItem('eggs', 12);
        this.toBuyList.addItem('bananas', 10);
        this.toBuyList.addItem('milk', 6);

        //Already bought list
        this.alreadyBoughtList = new ShoppingList();
    }

    //Prototype for a shopping list
    function ShoppingList(){
        //List of shopping items
        var itemsList = [];

        this.addItem = function(name, quantity){
            //Check if the argument is a ShoppingListItem
            if ( name instanceof ShoppingListItem ){
                var newItem = name;
            }else{
                var newItem = new ShoppingListItem(name, quantity)
            }
            itemsList.push( newItem );
        }

        this.removeItem = function( index ) {
            itemsList.splice(index, 1);
        }

        this.getItem = function (index) {
            return itemsList[index];
        }

        this.getList = function () {
            return itemsList;
        }

        this.isListEmpty = function(){
            return (itemsList.length === 0);
        }
    }

    //Prototype for Shopping List Item
    function ShoppingListItem(itemName, itemQuantity){
        this.name = itemName;
        this.quantity = itemQuantity;
    }
})();
