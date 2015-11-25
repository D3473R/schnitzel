(function () {
    var app = angular.module('location', ['ui.bootstrap', 'api']);

    app.controller('LocationListCtrl', LocationListCtrl);
    app.controller('LocationEntryCtrl', LocationEntryCtrl);

    function LocationEntryCtrl($scope, $routeParams, locationApi, tagApi) {

        $scope.data = {};
        if ($routeParams.id) {
            $scope.heading = 'Location Bearbeiten';
            $scope.data = locationApi.get({id: $routeParams.id});
        } else {
            $scope.heading = 'Hinzufügen einer Location';
        }

        $scope.location = {
            category: 'general',
            general: 'Allgemein',
            room: 'Vorlesungsraum'
        };
        console.log($scope.data);

        $scope.save = function (){
            console.log($scope.data);
            console.log($scope.data.isActive)
            if($routeParams.id){
                $scope.data.$update(function () {
                    location.href = '#/listlocations';
                });
            } else {
                locationApi.save($scope.data, function () {
                    location.href = '#/listlocations';
                });
            }
        }
    }

    function LocationListCtrl($scope, locationApi){
        console.log(locationApi.query());
        $scope.entity = 'location';
        $scope.name = 'Ort';
        $scope.tableheaders = {
            room: 'Raumnummer',
            name: 'Raumname',
            description: 'Beschreibung'
        };
        function loadEntries(){
            locationApi.query((function(data){
            console.log(data);
            $scope.data = data;
        }));}

        $scope.delete = function(id) {
            locationApi.delete({id:id});
            loadEntries();
        };
        loadEntries();
    }

})();