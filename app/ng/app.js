(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.home',
        'app.skills',
        'app.projects',
        'app.utils'
    ]).
      config(function ($routeProvider) {
          $routeProvider.
            when('/home', {
                templateUrl: 'ng/templates/home.html'
            }).
            when('/info', {
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