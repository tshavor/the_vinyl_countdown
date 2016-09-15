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
            console.log("in the controller i see vinyl data...", vinylData);
            $scope.vinyls = vinylData;
            // if ($scope.vinyls !== vinylData) {
            //     alert("nothing here fool!");
            // }
            console.log("vinylscope", $scope.vinyls)
        })

    }


    $scope.savevinyl = function($indexValueofSumthin, savedVinyls, ObjFromFirebase) {

        let clickedvinyl = $scope.vinyls[$indexValueofSumthin]
        let chosenvinyl = {};
        console.log("$indexValueofSumthin", $indexValueofSumthin)
        chosenvinyl.name = clickedvinyl.name;
        chosenvinyl.title = clickedvinyl.title;
        chosenvinyl.urls = clickedvinyl.urls;
        chosenvinyl.images = clickedvinyl.images;
        chosenvinyl.description = clickedvinyl.description;
        chosenvinyl.id = clickedvinyl.id;
        chosenvinyl.thumbnail = clickedvinyl.thumbnail;
        chosenvinyl.uid = AuthFactory.isAuthenticated();
        chosenvinyl.date = Date();
        // console.log("ObjFromFirebase", )

        console.log("comscopid", $scope.vinyl)
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
