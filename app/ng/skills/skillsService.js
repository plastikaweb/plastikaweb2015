(function () {
    'use strict';

    angular.module('app.skills')
      .factory('skillsService', skillsService);

    function skillsService(FIREBASE_URL, chartOptionsService, $firebaseArray) {

        var ref = new Firebase(FIREBASE_URL + 'skills'),
          chartOptions = chartOptionsService.getOptions();

        return {
            getSkills: function () {
                var data = $firebaseArray(ref.orderByChild('active')
                  .limitToLast(8));
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
