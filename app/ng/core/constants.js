(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('CHART_OPTIONS', {
    trackColor: '#f2f2f2',
    scaleLength: 15,
    lineCap: 'round',
    size: 220,
    rotate: 0,
    lineWidth: 15,
    animate: {
      duration: 3000,
      enabled: true
    },
    easing: 'easeInOutSquare'
  });

})();
