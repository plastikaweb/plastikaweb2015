(function () {
    'use strict';

    angular.module('app.utilities', [])
      .filter('filterPropByValue', function () {
          return function (items, propName, propValue) {
              var result = [];
              angular.forEach(items, function (value) {
                  if (value[propName] === propValue) {
                      result.push(value);
                  }
              });
              return result;
          };
      });
}());
