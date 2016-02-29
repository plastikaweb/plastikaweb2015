(function () {
  'use strict';

  angular
    .module('app.home')
    .directive('projectsPanel', projectsPanel);

  function projectsPanel() {
    return {
      restrict: 'E',
      emplateUrl: '../directives/home-projects-panel.html',
      replace: true,
      scope: {
        projectsList: '='
      }
    };
  }

})();