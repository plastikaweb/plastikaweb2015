(function(){
  'use strict';

  angular.module('app', [
    'app.skills'
  ]).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  });;

})();