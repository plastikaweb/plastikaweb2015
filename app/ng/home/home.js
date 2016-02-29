(function () {
    'use strict';

    angular
      .module('app.home')
      .controller('Home', Home);

    function Home(skillsService) {
        //presentation
        this.hello = 'Hello, my name is Carlos Matheu';
        this.more = 'I am a creative web developer specialised in Frontend, specially javascript, CSS3 and HTML5.';

        //skills
        this.skillsTitle = 'Languages and skills';
        this.skills = skillsService.getSkills();

        //projects
        this.projectsTile = '';
        this.projects = projectsService.getProjects();
    }

})();

