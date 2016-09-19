"use strict";

app.controller("savedVinylCtrl", function($scope, $location, AuthFactory, SearchDatabaseFactory, $route) {

    $scope.$on('onRepeatLast', function(scope, element, attrs) {
        $('.materialboxed').materialbox();
    });

    let uid= $scope.$parent.getUser();
    $scope.loadSavedvinyl = function() {

        let items = [];
        SearchDatabaseFactory.getvinyl(uid)
            .then(function(response) {
                // console.log("response", response)
                Object.keys(response).forEach(function(key) {
                    response[key].id = key;
                    items.push(response[key]);

                });
                $scope.albumList = items;

            });
    };
    $scope.loadSavedvinyl();


    $scope.deletevinylCall = function(vinyl) {

                console.log("you clicked delete", vinyl)
        SearchDatabaseFactory.deletevinyl(vinyl.id)
            .then((chosenvinyl) => {
                $scope.vinyls = chosenvinyl;
                $route.reload();
                // $location.path("/savedvinyls");
                SearchDatabaseFactory.getvinyl()
                    .then((chosenvinyl) => {
                        $scope.vinyls = chosenvinyl;
                    });
            });
    };
});
