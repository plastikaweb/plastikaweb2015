(function () {
    'use strict';

    angular.module('app.core', [
        /*
        * App modules
         */
        'app.home',
        'app.skills',
        'app.projects',
        'app.utils',
        /*
         * Angular modules
         */
        'ngSanitize',
        'ngRoute',
        /*
         * 3rd Party modules
         */
        'easypiechart',
        'iso.directives'
    ]);

})();