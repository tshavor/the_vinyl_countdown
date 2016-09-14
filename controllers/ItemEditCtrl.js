// "use strict";

// app.controller("ItemEditCtrl", function($scope, ItemStorage, $location, $routeParams){

// // $scope.editedTask;

// $scope.runItemEdit = function (changedItem) {
//  let id = $routeParams.itemId;
//  console.log(id);
// ItemStorage.editItem(id, changedItem)
// .then( () =>
//     console.log(changedItem)
//     )

// //First subsequent function post-editItem-promise: console.log the edited item
//  .then(function(){
//         $location.url('/item/list');
//     })
// .then (function () {
//     console.log(id);
// });
//  //Second subsequent function post-editItem-promise: $location changes the url back kick to item/list view:


// //NOTICE THAT TO CHAIN YOUR THENS YOU CAN'T USE A SEMI-COLON UNTIL THE VERY LAST ONE

// };

// });


/////////JOES EDIT
"use strict";

app.controller("ItemEditCtrl", function($scope, $location, $routeParams, ItemStorage) {
  $scope.title = "Edit Item";
  $scope.btnText = "Update";
  $scope.newTask = {};

  ItemStorage.getSingleItem($routeParams.itemId)
  .then( (response) => {
    $scope.newTask = response;
  });

  $scope.addNewItem = () => {
    ItemStorage.updateItem($routeParams.itemId, $scope.newTask)
    .then ( (response) => {
      $location.url("/items/list");
    });
  };
});
//load the same partial, but set a different controller for it whether its a new or an edit list function


