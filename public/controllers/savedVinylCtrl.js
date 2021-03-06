"use strict";

app.controller("savedVinylCtrl", function($scope, $location, AuthFactory, SearchDatabaseFactory, $route, SearchTermData) {

    $scope.searchText = SearchTermData;

    $scope.$on('onRepeatLast', function(scope, element, attrs) {
        $('.materialboxed').materialbox();
    });

    let uid= $scope.$parent.getUser();
    $scope.loadSavedvinyl = function() {


        let items = [];
        SearchDatabaseFactory.getvinyl(uid)
            .then(function(response) {

        // for materialbox images to appear dynamically
$(document).ready(function(){
    $('.materialboxed').materialbox();
  });
//////////////////////////////////////////////
                // console.log("response", response)
                Object.keys(response).forEach(function(key) {
                    // response[key].id = key;
                    response[key].noteId= key;
                    items.push(response[key]);
                });
                $scope.albumList = items;
            });


    };
    $scope.loadSavedvinyl();


    $scope.deletevinylCall = function(vinyl) {

                console.log("you clicked delete", vinyl)
                showToast('You deleted me!', 3000)

        SearchDatabaseFactory.deletevinyl(vinyl.noteId)

            .then((chosenvinyl) => {
                $scope.vinyls = chosenvinyl;
                $route.reload();
                // $location.path("/savedvinyls");
                SearchDatabaseFactory.getvinyl()
                    .then((chosenvinyl) => {
                        $scope.vinyls = chosenvinyl;
                // showToast('You deleted me!', 3000)
                    });
            });
    };

    ////////added to update notes on cards/////////////////////
    $scope.updateVinyl = function(album) {
        console.log("adding notes to album");
        // album.id= $scope.uid;
        let AlbumID = album.noteId;
        console.log("albumID", AlbumID);
        console.log("album", album);
        SearchDatabaseFactory.updateItem(AlbumID, album)
        .then(() =>{showToast('You added notes!', 3000)

        })

    };
});
