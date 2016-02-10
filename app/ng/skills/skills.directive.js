(function () {
  'use strict';

  angular
    .module('app.skills')
    .directive('skillsPanel', skillsPanel);

  function skillsPanel() {
    return {
      restrict: 'E',
      templateUrl: '../templates/skills-panel.html',
      controller: 'Skills',
      controllerAs: 'sk'
    };
  }

})();