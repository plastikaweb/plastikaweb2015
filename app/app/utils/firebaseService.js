(function () {
    'use strict';

    angular.module('app.utils')
      .factory('firebaseService', firebaseService);

    function firebaseService(FIREBASE_URL, $firebaseArray) {

        return {
            getData: function (module) {
                var ref = new Firebase(FIREBASE_URL + module),
                  data = $firebaseArray(ref.orderByChild('active'));
                return data;
            }
        };
    }

})();
