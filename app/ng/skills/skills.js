(function () {
  'use strict';

  angular
    .module('app.skills')
    .controller('Skills', Skills);

  function Skills(skillsService, CHART_OPTIONS) {

    var self = this;

    skillsService.getSkills()
      .success(function (data) {
        data = data.skills;
        for (var i in data) {
          data[i].options = angular.extend(data[i].options, CHART_OPTIONS);
        }

        self.list = data;
      });
  }

})();