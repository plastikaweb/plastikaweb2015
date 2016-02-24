(function () {
    'use strict';

    angular
      .module('app.skills')
      .controller('Skills', Skills);

    function Skills(skillsService, chartOptionsService, $filter) {

        var $self = this,
          chartOptions = chartOptionsService.getOptions();

        skillsService.getSkills()
          .success(function (data) {
              data = data.skills;
              for (var i in data) {
                  data[i].options = angular.extend(data[i].options, chartOptions);
              }
              $self.list = $filter('filterPropByValue')(data, 'active', true);
          });
    }

})();