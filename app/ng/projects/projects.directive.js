(function () {
  'use strict';

  angular
    .module('app.projects')
    .directive('projectsPanel', projectsPanel);

  function projectsPanel() {
    return {

      templateUrl: 'ng/templates/projects-panel.html',
      controller: 'Projects',
      controllerAs: 'pj'
    };
  }

})();