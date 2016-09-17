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
                console.log("vinyl results from LastFM", vinylData);
                resolve(vinylData);
                console.log("name", vinylData)
                // for (var key in vinylData) {
                //     results.push(vinylData[key])
                //     console.log('these are your results within the for loop', results, 'what you are looking for is an array that contains the global result object')
                // resolve(results);
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
// *****ADDS SELECTED VINYL TO YOUR COLLECTION- I will need to scrub the "#" off of the #text
// key before uploading to firebase!!!*****

    // debugger
    // scrubbedVinylData= vinylData.replaceAll("#", "");
    // console.log("scrubbedVinylData", scrubbedVinylData);

    let postNewvinyl = (chosenvinyl) => {
        return $q(function(resolve, reject) {
            $http.post(`https://the-vinyl-countdown.firebaseio.com/vinyl/.json`, chosenvinyl)

            .success(function(ObjFromFirebase) {
                console.log("comDat", ObjFromFirebase.name)
                let chosenvinylId = ObjFromFirebase.name;
                // chosenvinyl.vinylId = chosenvinylId;
                // $http.patch(`https://vinylsapp-db242.firebaseio.com/vinyls/.json/vinyls/${chosenvinylId}.json`, chosenvinyl);
            })
        });
    };

    ///////////*****still working on delete functionality**********\\\\\\\\\\\
// DELETES VINYL FROM COLLECTION
    var deletevinyl = (vinyl, FirebaseURL) => {
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

    /////////////////**************typeahead*************\\\\\\\\\\\\\\\\\\\

    return {
        vinylList: vinylList,
        getvinyl: getvinyl,
        postNewvinyl: postNewvinyl,
        deletevinyl: deletevinyl

    };
});
