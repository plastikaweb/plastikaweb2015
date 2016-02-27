(function () {
    'use strict';

    angular
      .module('app.skills')
      .controller('Skills', Skills);

    function Skills(skillsService) {
        this.list = skillsService.getSkills();
    }

})();