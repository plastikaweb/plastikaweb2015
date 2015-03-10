(function() {
  'use strict';

  angular
    .module('app.core')
    .config(function($routeProvider) {
      //default view to home

      $routeProvider.otherwise({
        redirectTo: '/'
      });
    });
})();
