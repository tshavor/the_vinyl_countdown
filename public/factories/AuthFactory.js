"use strict";

app.factory("AuthFactory", function($q) {
  let createUser = function(userObj) {
    //need to return a promise - the new firebase 3 has promise return built in already - method, auth() - method - get login user, create new users, sign out users
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password) //here we create our own method on a built-in FB method (auth) //CAN ONLY PASS IN TWO ARGUMENTS HERE
    //this will automatically return a promise
    //returning a promise, but we don't have to write it, because they're already embedded as Firebase methods. We have universal access to firebase through link in index.html
      .catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        ////....usually put something here
    });
  };

  let loginUser = function (userObj) {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .catch(function(error){
      let errorCode = error.code;
      let errorMessage = error.message;
      ////....usually put something here
    });
  };

  let logoutUser = function() {
    return firebase.auth().signOut();
  };

  let isAuthenticated = function () {
    return(firebase.auth().currentUser) ? true : false;
    // ? : a shortened version of if, else with ? being if and : being else. If it is true then it will return true, if it is false it will return false
    // let greeting = user.gender == "male" ? "Hey, dude" : "S'up dudette" - called tirinary
  };

  return {createUser, loginUser, logoutUser, isAuthenticated};

});

