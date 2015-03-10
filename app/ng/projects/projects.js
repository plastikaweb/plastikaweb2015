(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('Projects', Projects);

  function Projects(projectsService) {

    var self = this;

    projectsService.getProjects()
      .success(function (data) {
        data = data.projects;

        self.list = data;
      });
  }

})();