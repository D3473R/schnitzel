(function(){
    var app = angular.module('schnitzelApp', []);

    app.controller('RoomCtrl', function($scope){
        $scope.location = {
            room: 'A106',
            name: 'Labor für Software Engineering',
            image: 'computerraum',
            features: {
                chair: 40,
                pc: 16,
                projector: 1,
                printer: 1
            },
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
        };
    });
})();