'use strict';
app.controller("SearchCtrl", function($scope, SearchDatabaseFactory, $location, AuthFactory) {
    $scope.vinyls = [];
    // where is this function (getUser) being called?
    $scope.uid = AuthFactory.isAuthenticated();
    $scope.vinyl = {};


    $scope.$on('onRepeatLast', function(scope, element, attrs) {
        $('.materialboxed').materialbox();
    });

// this may be a materialize thing...
    // (function() {

    //     $(".button-collapse").sideNav();

    // })();


    $scope.searchDatabase = function(vinylToSearch) {
        SearchDatabaseFactory.vinylList(vinylToSearch).then(function(vinylData) {
            // console.log("in the controller i see vinyl data...", vinylData);

////////////////BUILDING A NEW ALBUM OBJECT///////////////////////////////
        var revisedAlbumList= [];

        for (var i = 0; i < vinylData.results.albummatches.album.length; i++) {
            var temp= vinylData.results.albummatches.album[i];
            let newRecord = {
                AlbumName: temp.name,
                Artist: temp.artist,
                ImgUrl: temp.image[3]['#text'],
                Uid: temp.uid,
                AlbumID: temp.mbid
            };

            revisedAlbumList.push(newRecord);
        }

        console.log("revisedAlbumList", revisedAlbumList);

            // $scope.vinyls = vinylData;

        })

    }


    $scope.savevinyl = function($indexValueofSumthin, savedVinyls, ObjFromFirebase) {

        let clickedvinyl = $scope.vinyls[$indexValueofSumthin]
        let chosenvinyl = {};
        console.log("$indexValueofSumthin", $indexValueofSumthin)
        chosenvinyl.name = clickedvinyl.name;
        chosenvinyl.title = clickedvinyl.title;
        chosenvinyl.urls = clickedvinyl.urls;
        chosenvinyl.id = clickedvinyl.id;
        chosenvinyl.uid = AuthFactory.isAuthenticated();

        // console.log("ObjFromFirebase", )

        // console.log("comscopid", $scope.vinyl)
        // SearchDatabaseFactory.postNewvinyl($scope.vinyl)
        SearchDatabaseFactory.postNewvinyl(chosenvinyl)
        // .then(function(response) {
        //     $location.path("/partials/savedVinyls");
        //     SearchDatabaseFactory.getvinyl();
        //     console.log("savedVinyls", savedVinyls)
        // });
        console.log("chosenvinyl", chosenvinyl)
    };



})
