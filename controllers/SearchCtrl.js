'use strict';
app.controller("SearchCtrl", function($scope, SearchDatabaseFactory, $location, AuthFactory) {
    $scope.vinyls = [];
    $scope.vinyl = {};
    $scope.vinylToSearch = "";
    var revisedAlbumList= null;

    $scope.$on('onRepeatLast', function(scope, element, attrs) {
        $('.materialboxed').materialbox();
    });

// this may be a materialize thing...
   //  (function() {
   //      $(".button-collapse").sideNav();
   // })();


    $scope.searchDatabase = function(vinylToSearch) {
    $scope.uid = $scope.$parent.getUser();
    console.log ("$scope.uid", $scope.uid);
    // where is this function (getUser) being called?

        // console.log ("vinylToSearch", vinylToSearch);
        SearchDatabaseFactory.vinylList(vinylToSearch).then(function(vinylData) {

            // console.log("in the controller i see vinyl data...", vinylData);

//BUILDING A NEW ALBUM OBJECT:
        var revisedAlbumList= [];

        for (var i = 0; i < vinylData.results.albummatches.album.length; i++) {
            var temp= vinylData.results.albummatches.album[i];
            let newRecord = {
                AlbumName: temp.name,
                Artist: temp.artist,
                ImgUrl: temp.image[3]['#text'],
                AlbumID: temp.mbid,
                AlbumNotes:""
            };
            // pushing the contents of newRecord into revisedAlbumList
            revisedAlbumList.push(newRecord);
        }
        // SUCCESS!!!!
        $scope.albumList= revisedAlbumList;
        // console.log("albumList", $scope.albumList);
        console.log("revisedAlbumList", revisedAlbumList);

        })
    }

//////////////////////////////////////////////////////////////////////////////
    $scope.saveVinyl = function(album) {
        console.log("you want to save this vinyl!");
        album.id= $scope.uid;
        console.log("album", album);
        SearchDatabaseFactory.postNewvinyl(album);

        // Materialize.toast(message, displayLength, className, completeCallback);
        // Materialize.toast('I am a toast!', 4000); // 4000 is the duration of the toast

    };

});

