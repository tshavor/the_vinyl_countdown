"use strict";

app.factory("SearchDatabaseFactory", function($routeParams, $q, $http, AuthFactory) {
//the $q injects an Angular promise
// this grabs it from the api

// DONE!
    let vinylList = (searchText) => {
        // let results = [];
        return $q(function(resolve, reject) {

            $http.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchText}&api_key=ff6d0bcea5dbfbb8b4f27afac1df217a&format=json&limit=21`)
            .success(function(vinylData) {
            // I am getting the correct OBJECT from LastFM!
                resolve(vinylData);
                // console.log("name", vinylData)

                })
                // console.log("name", vinylData.results.albummatches.album);
                // SUCCESS!!!
            .error(function(error) {
                reject(error);
            })
        });
    };
////////////////////////////////////////////////////////////////////////////////
// GETS USER VINYL COLLECTION FROM FirebaseURL
    let getvinyl = (uid) => {
        return $q(function(resolve, reject) {

            $http.get(`https://the-vinyl-countdown.firebaseio.com/vinyl/.json?orderBy="id"&equalTo="${uid}"`)
                .success(function(vinylData) {
                    resolve(vinylData);
                    // console.log("vinylData", vinylData)
                })
                .error(function(error) {
                    reject(error);
                });
        });
    };

//////////////////////////////////////////////////////////////////////////////////
// *****ADDS SELECTED VINYL TO YOUR COLLECTION-
    let postNewvinyl = (chosenvinyl) => {
        return $q(function(resolve, reject) {
            $http.post(`https://the-vinyl-countdown.firebaseio.com/vinyl/.json`, chosenvinyl)
            // use stringify here to convert

            .success(function(ObjFromFirebase) {
                // console.log("comDat", ObjFromFirebase.name)
                // let chosenvinylId = ObjFromFirebase.name;
            })
        });
    };

// DELETES VINYL FROM COLLECTION

    var deletevinyl = (vinyl) => {
        console.log("this is a deleted vinyl", vinyl);
        return $q((resolve, reject) => {
            $http.delete(`https://the-vinyl-countdown.firebaseio.com/vinyl/${vinyl}.json`)
                .success((data) => {
                    resolve(data);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

    return {
        vinylList: vinylList,
        getvinyl: getvinyl,
        postNewvinyl: postNewvinyl,
        deletevinyl: deletevinyl

    };
});
