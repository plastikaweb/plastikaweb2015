(function(){
  'use strict';

  angular.module('app', [
    'ngSanitize',
    'easypiechart',
    'app.skills'
  ]).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  });

})();