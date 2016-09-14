"use strict";
//$routeParams give access to whatever is in URL bar
app.controller("ItemViewCtrl", function ($scope, ItemStorage, $routeParams ){
    /*

    Being passed into controller:
    1. $scope, which allows two-way data-binding
    2. the ItemStorage factory, which stores/creates the data we'll need throughout multiple controllers
    3. $routeParams, which allows us to access a specific URL through an ID it automatically creates upon a view with multiple associated items, e.g., our item list, which has multiple items for which we don't manually create an item ID; instead Angular creates it for us <== LIZ DOUBLE-CHECK THIS EXPLANATION */
    $scope.items = [];

    //Create empty array to hold objects we collect from the Item Storage factory

    ItemStorage.getItemList($scope.$parent.getUser()) //Controller told to retrieve item list from factory

    .then( (itemCollectionArr) => { // Once we have the list (itemCollectionArr), we equate it with the $scope.items array

        $scope.items = itemCollectionArr;


        $scope.selectedItem = $scope.items.filter(function(item){ //Here we create a property on controller that equates the item's ID (which itself is an object key drawn from Firebase) with routeParams, e.g., the Angular stand-in for multiple ID's we don't create manually (ID's drawn from Firebase ==> again, unclear why we have to do this instead of just passing in item.id through string interpolation, i.e., ${item.id})

            return item.id === $routeParams.itemId;
        })[0]; //Filter returns an array, always, so have to select [0] for first object (this is an array that contains one object)
    });
});
