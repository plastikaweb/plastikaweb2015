(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('CHART_OPTIONS', {
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
  })
    .constant('FIREBASE_URL', 'https://blazing-torch-2654.firebaseio.com/');

})();
