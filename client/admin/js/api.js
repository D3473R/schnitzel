(function(){
    var api = angular.module('api',['ngResource']);

    api.service('locationApi', function($resource) {
        return $resource('/api/admin/locations/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });

    api.service('riddleApi', function($resource) {
        return $resource('/api/admin/riddles/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });

    api.service('tagApi', function($resource) {
        return $resource('/api/admin/tags/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });

    api.service('loginApi', function($resource) {
        return $resource('/api/login', { username: 'user', password: 'password' }, {
        });
    });
})();

