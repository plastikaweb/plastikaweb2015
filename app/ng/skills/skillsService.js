(function () {
  'use strict';

  angular.module('app.skills')
    .factory('skillsService', skillsService);

  function skillsService($http) {

    var Service = {};
    Service.getSkills = function () {
      return $http.get("./data/skills.json");
    };

    return Service;
  }
  skillsService.$inject = ['$http'];

})();
