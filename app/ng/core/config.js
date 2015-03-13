(function () {
  'use strict';
  
  function changeMarkup($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  }

  angular.module('app.core')
    .config(changeMarkup)
    .value('config', {
      appTitle: 'Plastikaweb site',
      version: '1.0.0'
    });

})();