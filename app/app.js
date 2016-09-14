"use strict";
var app = angular.module("TodoApp", ["ngRoute"])
.constant('FirebaseURL','https://the-vinyl-countdown.firebaseio.com/');
//Module takes two arguments: name and array of dependencies
//Module has pseudo-global scope
//Controllers (functions) have local/lexical scope

// App/module is an object upon which we are creating properties
// Data in a controller communicates through scope to template view

//ROUTE = URL OF APPLICATION, NOT PATH TO FILES

app.config(function($routeProvider){

    let isAuth = (AuthFactory) => new Promise( (resolve, reject) =>
        //if you are using fat arrows and you are returning something right away you dont need {}s, or the word return
        // same as (AuthFactory) => {
        // return new Promise
        // }
     {
        if(AuthFactory.isAuthenticated()) {
            resolve();
            //dont need to pass anyhting in, it just is or isnt, and if not, we will reject it
        } else {
            reject();
        }
    });

    $routeProvider.
        when("/", {
            templateUrl: "partials/login.html",
            controller: "LoginCtrl"
        }).
        //when the page loads and it is "home"
        when("/login", {
            templateUrl:"partials/login.html",
            controller: "LoginCtrl"
        }).
        when("/items/list", { //Here we are creating a URL and equating it with its associated partial
            templateUrl: 'partials/item-list.html', //Note that the grammar here specifies "Url", not all upper-case ("URL")
            controller: "ItemListCtrl",
            resolve: {isAuth}
            //resolve - wait until something has happened, and inject it into the crontorller as a dependency. We can short circuit it and write a promise to check if someone is authenticated. If not, the promise won't resolve, and if it doesnt resolve the route will not load.
        }).
        when("/items/new", {
            templateUrl: 'partials/item-form.html',
            controller: "ItemNewCtrl",
            resolve: {isAuth}
        }).
        when('/items/view/:itemId', {
            //The above "/: whatever" syntax is particular to URL's for which we'll be using $routeParams ... $routeParams stands in for (:)?????
            templateUrl: "partials/item-details.html",
            controller: "ItemViewCtrl",
            resolve: {isAuth}
        }).

        // when('/items/edit/:itemId', {
        //     templateUrl: 'partials/edit-task.html',
        //     controller: 'ItemEditCtrl',
        //     resolve: {isAuth}
        // }).

        when("/items/view/:itemId/edit", {
            templateUrl: "partials/item-form.html",
            controller: "ItemEditCtrl",
            resolve: {isAuth}
        }).

        otherwise("/");
        //The above is a safety URL that prevents users from accessing URL's that we don't want them to
});

app.run( ($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
});

















