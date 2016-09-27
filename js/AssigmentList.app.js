(function(){
    'use strict';

    var app = angular.module('AssigmentListApp', []);
    app.controller('AssigmentListController', AssigmentListController);
    app.service('AssigmentList', AssigmentList);

    AssigmentListController.$inject = ['AssigmentList'];
    function AssigmentListController(AssigmentList){
        this.list = AssigmentList;
    }

    function AssigmentList(){
        var list = [];

        this.addItem = function(title, folder){
            //Check if the argument is a ShoppingListItem
            if ( title instanceof AssigmentListItem ){
                var newItem = title;
            }else{
                var newItem = new AssigmentListItem(title, folder)
            }
            list.push( newItem );
        }

        this.addItem('Assigment 1', "assignment1/");
        this.addItem('Assigment 2', "assignment2/");

        this.getList = function () {
            return list;
        }
    }

    //Prototype for Assigment List Item
    function AssigmentListItem(title, folder){
        this.title = title;
        this.folder = folder;
    }
})();
