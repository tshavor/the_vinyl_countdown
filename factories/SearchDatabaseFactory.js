"use strict";

app.factory("SearchDatabaseFactory", function($routeParams, $q, $http, AuthFactory) {
//the $q injects an Angular promise
// this grabs it from the api
    let vinylList = (searchText) => {
        return $q(function(resolve, reject) {

            // $http.get(`http://gateway.marvel.com:80/v1/public/vinyls?limit=50&titleStartsWith=${searchText}&=json&apikey=bf48bed3cb9a213603c0267fe6b78a65`)
            $http.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchText}&api_key=ff6d0bcea5dbfbb8b4f27afac1df217a&format=json&limit=21`)
            .success(function(vinylData) {
            // I am getting the correct OBJECT from LastFM!
                console.log("vinyl results from LastFM", vinylData);

                resolve(vinylData.data.results);
                console.log("name", vinylData.data.results)
            })

            .error(function(error) {
                reject(error);
            });
        });
    };

////////////////////////////////////////////////////////////////////////////////

    let getvinyl = (uid) => {
        return $q(function(resolve, reject) {

            $http.get(`https://vinylsapp-db242.firebaseio.com/vinyls/.json?orderBy="uid"&equalTo="${uid}"`)
                .success(function(vinylData) {
                    resolve(vinylData);
                    console.log("vinylData", vinylData)
                })
                .error(function(error) {
                    reject(error);
                });
        });
    };

//////////////////////////////////////////////////////////////////////////////////

    let postNewvinyl = (chosenvinyl) => {
        return $q(function(resolve, reject) {
            $http.post(`https://vinylsapp-db242.firebaseio.com/vinyls/.json`, chosenvinyl)
            // JSON.stringify(chosenvinyl))
            .success(function(ObjFromFirebase) {
                console.log("comDat", ObjFromFirebase.name)
                let chosenvinylId = ObjFromFirebase.name;
                // chosenvinyl.vinylId = chosenvinylId;
                // $http.patch(`https://vinylsapp-db242.firebaseio.com/vinyls/.json/vinyls/${chosenvinylId}.json`, chosenvinyl);
            })
        });
    };

    ///////////*****still working on delete functionality**********\\\\\\\\\\\

    var deletevinyl = (vinyl, FirebaseURL) => {
        console.log("this is a deleted vinyl", vinyl);
        return $q((resolve, reject) => {
            $http.delete(`https://vinylsapp-db242.firebaseio.com/vinyls/${vinyl}.json`)
                .success((data) => {
                    resolve(data);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

    /////////////////**************typeahead*************\\\\\\\\\\\\\\\\\\\

    return {
        vinylList: vinylList,
        getvinyl: getvinyl,
        postNewvinyl: postNewvinyl,
        deletevinyl: deletevinyl

    };
});
