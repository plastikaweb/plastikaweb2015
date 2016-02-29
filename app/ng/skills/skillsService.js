(function () {
    'use strict';

    angular.module('app.skills')
      .factory('skillsService', skillsService);

    function skillsService(chartOptionsService, firebaseService) {

        var chartOptions = chartOptionsService.getOptions();

        return {
            getSkills: function () {
                var data = firebaseService.getData('skills');
                data.$loaded().then(function () {
                    angular.forEach(data, function (value, key) {
                        value.options = angular.extend(value.options, chartOptions);
                    });
                });
                return data;
            }
        };
    }

})();
