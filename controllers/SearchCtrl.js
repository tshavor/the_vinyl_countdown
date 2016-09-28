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
    (function() {
        $(".button-collapse").sideNav();
   })();

    $scope.searchDatabase = function(vinylToSearch) {
    $scope.uid = $scope.$parent.getUser();
        // showToast('You clicked search!', 3000)
    console.log ("$scope.uid", $scope.uid);

        // console.log ("vinylToSearch", vinylToSearch);
        SearchDatabaseFactory.vinylList(vinylToSearch).then(function(vinylData) {


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

        $scope.albumList= revisedAlbumList;
        console.log("revisedAlbumList", revisedAlbumList);

// for materialbox images to appear dynamically
$(document).ready(function(){
    $('.materialboxed').materialbox();
  });
//////////////////////////////////////////////

        })
    }

//////////////////////////////////////////////////////////////////////////////
    $scope.saveVinyl = function(album) {
        console.log("you want to save this vinyl!");
        album.id= $scope.uid;
        console.log("album", album);
        SearchDatabaseFactory.postNewvinyl(album);

    };

});

