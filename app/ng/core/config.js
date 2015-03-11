(function () {
  'use strict';

  angular.module('app.core', [
    /*
     * Angular modules
     */
    'ngSanitize',
    /*
     * Our reusable cross app code modules
     */

    /*
     * 3rd Party modules
     */
    'easypiechart',
    'iso.config'

  ]);

  function changeMarkup($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  }

  angular.module('app.core')
    .config(changeMarkup);


  changeMarkup.$inject = ['$interpolateProvider'];

})();