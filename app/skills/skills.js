(function () {
  'use strict';

  angular
    .module('app.skills')
    .controller('Skills', Skills);

  Skills.$inject = ['skillsService', 'CHART_OPTIONS'];

  function Skills(skillsService, CHART_OPTIONS) {

    var self = this;

    skillsService.getSkills()
      .success(function (data) {

        for (var i in data) {
          data[i].options = angular.extend(data[i].options, CHART_OPTIONS);
        }

        self.list = data;
      });
  }

})();