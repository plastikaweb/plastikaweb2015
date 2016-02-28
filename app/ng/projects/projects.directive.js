(function () {
  'use strict';

  angular
    .module('app.projects')
    .directive('projectsPanel', projectsPanel);

  function projectsPanel() {
    return {

      templateUrl: '../directives/home-projects-panel.html',
      controller: 'Projects',
      controllerAs: 'pj'
    };
  }

})();