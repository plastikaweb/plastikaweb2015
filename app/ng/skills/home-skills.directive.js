(function () {
  'use strict';

  angular
    .module('app.skills')
    .directive('skillsPanel', skillsPanel);

  function skillsPanel() {
    return {
      restrict: 'E',
      templateUrl: '../ng/directives/home-skills-panel.html',
      controller: 'Skills',
      replace: true,
      controllerAs: 'sk'
    };
  }

})();