(function () {
    'use strict';

    angular
      .module('app.skills')
      .controller('Skills', Skills);

    function Skills(skillsService, CHART_OPTIONS, $filter) {

        var $self = this;
        skillsService.getSkills()
          .success(function (data) {
              data = data.skills;
              for (var i in data) {
                  data[i].options = angular.extend(data[i].options, CHART_OPTIONS);
              }
              //TODO return the value not assign it to scope directly
              $self.list = $filter('filterPropByValue')(data, 'active', true);
          });
    }

})();