(function () {
  'use strict';

  angular
    .module('app.home')
    .directive('skillsPanel', skillsPanel);

  function skillsPanel() {
    return {
      restrict: 'E',
      templateUrl: '../ng/directives/home-skills-panel.html',
      replace: true,
      scope: {
        skillsList: '='
      }
    };
  }

})();