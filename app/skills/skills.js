(function () {
  'use strict';

  angular
    .module('app.skills')
    .controller('Skills', Skills);

  Skills.$inject = ['$scope', 'skillsService'];

  function Skills($scope, skillsService) {
    $scope.kk = "KKKK";
    skillsService.getSkills()
      .success(function (data) {
        console.log(data);
        $scope.skills = data;
      });
  }

})();