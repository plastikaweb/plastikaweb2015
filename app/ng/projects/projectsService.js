(function () {
  'use strict';

  angular.module('app.projects')
    .factory('projectsService', projectsService);

  function projectsService($http) {

    var Service = {};
    Service.getProjects = function () {
      return $http.get('./data/projects.json');
    };

    return Service;
  }

})();
