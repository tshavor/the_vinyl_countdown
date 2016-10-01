'use strict';
app.controller("SearchCtrl", function($scope, SearchDatabaseFactory, $location, AuthFactory) {
    $scope.vinyls = [];
    $scope.vinyl = {};
    $scope.vinylToSearch = "";
    var revisedAlbumList= null;


// this is a materialize thing...
    (function() {
        $(".button-collapse").sideNav();
   })();

    $scope.searchDatabase = function(vinylToSearch) {
    $scope.uid = $scope.$parent.getUser();
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
// for materialbox images to appear dynamically?
    $(document).ready(function(){
    $('.materialboxed').materialbox();

        $scope.albumList= revisedAlbumList;
        console.log("revisedAlbumList", revisedAlbumList);

  });


        })
    }

//////////////////////////////////////////////////////////////////////////////
    $scope.saveVinyl = function(album) {
        console.log("you want to save this vinyl!");
        showToast('You saved me!', 3000)
        album.id= $scope.uid;
        console.log("album", album);
        SearchDatabaseFactory.postNewvinyl(album);

    };

});

