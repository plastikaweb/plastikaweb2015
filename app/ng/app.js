(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.skills',
        'app.projects',
        'app.utilities'
    ]).
      config(function ($routeProvider) {
          $routeProvider.
            when('/home', {
                templateUrl: 'ng/templates/home.html',
            }).
            when('/skills', {
                templateUrl: 'ng/templates/skills.html'
            }).
            when('/projects/:name', {
                templateUrl: 'ng/templates/project.html'
            }).
            otherwise({
                redirectTo: '/home'
            });
      });
})();