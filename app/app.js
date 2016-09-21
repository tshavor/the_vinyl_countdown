"use strict";

var app = angular.module("VinylCountdown", ["ngRoute"])
.constant('FirebaseURL','https://the-vinyl-countdown.firebaseio.com/');

app.config(function($routeProvider){

    let isAuth = (AuthFactory) => new Promise( (resolve, reject) =>

     {
        if(AuthFactory.isAuthenticated()) {
            resolve();

        } else {
            reject();
        }
    });

    $routeProvider.
        when("/", {
            templateUrl: "partials/login.html",
            controller: "LoginCtrl"
        }).

        when("/login", {
            templateUrl:"partials/login.html",
            controller: "LoginCtrl"
        }).

        when("/search", {
            templateUrl:"partials/search.html",
            controller: "SearchCtrl"
        }).

        when("/savedVinyl", {
            templateUrl:"partials/savedVinyl.html",
            controller: "savedVinylCtrl"
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

















