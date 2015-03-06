(function () {
  'use strict';

  angular.module('app.skills')
    .factory('skillsService', skillsService);

  skillsService.$inject = ['$http'];

  function skillsService($http) {

    var Service = {};
    Service.getSkills = function () {
      return $http.get("./data/skills.json");
    };

    return Service;
  }

})();
