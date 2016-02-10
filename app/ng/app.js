(function(){
  'use strict';

  angular.module('app', [
    'app.core',
    'app.skills',
    'app.projects'
  ]).
    config(function($routeProvider){
      $routeProvider.
        when('/home', {
          templateUrl: 'templates/home.html'
        }).
        when('/projects', {
          templateUrl: 'templates/project.html'
        }).
        otherwise({
          redirectTo: '/home'
        });
    });
})();