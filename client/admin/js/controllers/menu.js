(function () {
    var app = angular.module('menu', []);

    app.controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope){
        $scope.items = {
            location:'Orte',
            riddle:'Rätsel',
            tags:'Tags'
        };
    }
})();