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
    'easypiechart'
  ]);

  angular.module('app.core')
    .config(changeMarkup);

  function changeMarkup($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  }

})();