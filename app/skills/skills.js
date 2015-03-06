(function () {
  'use strict';

  angular
    .module('app.skills')
    .controller('Skills', Skills);

  Skills.$inject = ['$scope', 'skillsService'];

  function Skills($scope, skillsService) {

   var chartOptions = {
      trackColor: '#f9f9f9',
      scaleColor: '#dfe0e0',
      scaleLength: 5,
      lineCap: 'square',
      size: 200,
      rotate: 0,
      lineWidth: 20
    };

    skillsService.getSkills()
      .success(function (data) {

        for(var i in data){
          data[i].options = angular.extend( data[i].options, chartOptions );
        };

        $scope.skills = data;
      });
  }

})();