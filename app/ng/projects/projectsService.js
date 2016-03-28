(function () {
    'use strict';

    angular.module('app.projects')
      .factory('projectsService', projectsService);

    function projectsService(firebaseService) {

        function getProjects() {
            return firebaseService.getData('projects');
        }

        return {
            getProjects: getProjects
        };
    }

})();
