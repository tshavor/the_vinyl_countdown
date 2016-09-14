"use strict";

app.controller("ItemNewCtrl", function ($scope, ItemStorage, $location){
    $scope.title = "Add New Task";
    $scope.btnText = "Save New Task";
    //added to switch up the form when the route uses this controller as opposed to the edit controller
    $scope.newTask = {
        task: '',
        assignedTo: '',
        dependencies: '',
        dueDate: '',
        isCompleted: false,
        location: '',
        urgency: 'normal',
        uid: $scope.$parent.getUser()
    };


$scope.addNewItem = function () {
    console.log("addNewItem function is loading");
    ItemStorage.postNewItem($scope.newTask)
    .then(function(){
        $location.url('#/item/list');
    });

    //First we post a new item from the object we have just created, then it goes to the item-list view
};

});
