(function () {
    'use strict';

    angular.module('app', [
        'app.core'
    ]).
      config(function ($routeProvider) {
          $routeProvider.
            when('/home', {
                templateUrl: 'app/home/home.html'
            }).
            when('/projects/:name', {
                templateUrl: 'app/projects/project.html'
            }).
            otherwise({
                redirectTo: '/home'
            });
      });
})();
