(function () {
    'use strict';

    angular.module('app.utils')
      .factory('chartOptionsService', chartOptionsService);

    function chartOptionsService() {

        return {
            getOptions: function () {
                return {
                    trackColor: '#f2f2f2',
                    scaleLength: 15,
                    lineCap: 'round',
                    size: 180,
                    rotate: 0,
                    lineWidth: 10,
                    animate: {
                        duration: 3000,
                        enabled: true
                    },
                    easing: 'easeInOutSquare'
                };
            }
        };
    }
})();