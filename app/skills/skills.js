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

  //TODO
  //filter no active items
  //order by order property
  angular.module('app.skills')
    .filter('showActive', function () {
      return function (items) {
        console.log(items);
        var filtered = [];
        angular.forEach(items, function(item){
          if(item.active){

            filtered.push(item);
          }
          return filtered;
        });

      };
    });

})();