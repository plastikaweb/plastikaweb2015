(function() {
  'use strict';

  angular
    .module('app.home')
    .run(appRun);

  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/home',
        config: {
          templateUrl: 'ng/home/home.html',
          title: 'Home',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Home'
          }
        }
      }
    ];
  }
})();
