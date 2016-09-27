(function(){
    'use strict';

    var app = angular.module('ShoppingListCheckOff', []);
    app.controller('AlreadyBoughtController', AlreadyBoughtController);
    app.controller('ToBuyController', ToBuyController);
    app.service('AlreadyBoughtList', AlreadyBoughtList);
    app.service('ToBuyList', ToBuyList);

    AlreadyBoughtController.$inject = ['ToBuyList', 'AlreadyBoughtList'];
    function AlreadyBoughtController(ToBuyList, AlreadyBoughtList){
        this.toBuyList = ToBuyList;
        this.boughtList = AlreadyBoughtList;
        console.log('AlreadyBoughtController');
        console.log(AlreadyBoughtList);
        console.log(ToBuyList);
    }

    ToBuyController.$inject = ['ToBuyList', 'AlreadyBoughtList'];
    function ToBuyController(ToBuyList, AlreadyBoughtList){
        this.toBuyList = ToBuyList;
        this.boughtList = AlreadyBoughtList;

        console.log('ToBuyController');
        console.log(AlreadyBoughtList);
        console.log(ToBuyList);

        this.markAsBought = function (index){
            this.boughtList.addItem( this.toBuyList.getItem(index) );
            this.toBuyList.removeItem(index);
        }
    }

    function AlreadyBoughtList(){
        return new ShoppingList();
    }

    function ToBuyList(){
        var toBuyList = new ShoppingList();
        toBuyList.addItem('cookies', 1);
        toBuyList.addItem('pasta', 2);
        toBuyList.addItem('eggs', 12);
        toBuyList.addItem('bananas', 10);
        toBuyList.addItem('milk', 6);
        return toBuyList;
    }

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

        this.getItem= function (index) {
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
