(function () {
    'use strict';

    angular.module('app.skills')
      .factory('skillsService', skillsService);

    function skillsService($http) {
        return {
            getSkills: function () {
                return $http.get('./data/skills.json');
            }
        };
    }

})();
