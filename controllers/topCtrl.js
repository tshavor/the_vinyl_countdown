"use strict";

app.controller("topCtrl", function($scope, $location, $window, AuthFactory) {
  $scope.isLoggedIn = false;
  let currentUser = null;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser = user.uid;
      //onAuthStateChanged will automatically get the user passed into it so we can get that out of it and set it to the current user
      //if there is a user then that will be true
      $scope.isLoggedIn = true;
      console.log("Current user logged in?", user.uid);
    } else {
      currentUser = null;
      // when they logout, set it back to null
      $scope.isLoggedIn = false;
      $window.location.href = "#/login";
      //we do not want anyone to see anyhting if they are not logged in, so we send them to the login page
    }
      $scope.apply();
      //setting something to true (the digest cycle - dirty checking - has somethingo on the scope obj changed? If it is, it will update the view) becuase this is happening inside the function, it's not an angular function so we have to force the digest cycle to happen manually to update the view - $scope.$apply()
  });

  $scope.getUser = () => {
    return currentUser;
  };

  $scope.logout = function () {
    AuthFactory.logoutUser()
  //returns a promise
    .then(function(data) {
      console.log("logged out", data);
    });
  };


});
