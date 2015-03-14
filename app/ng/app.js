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
          templateUrl: 'ng/home/home.html'
        }).
        when('/projects', {
          templateUrl: 'ng/projects/project.html'
        }).
        when('/contact', {
          templateUrl: 'ng/contact/contact.html'
        }).
        otherwise({
          redirectTo: '/home'
        });
    });

})();