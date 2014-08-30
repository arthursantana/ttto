'use strict';

angular.module('ttt', ['ngRoute'])
.config(function ($routeProvider) {
   $routeProvider
   .when('/', {
      templateUrl: 'main.html',
      controller: 'MainCtrl'
   })
});
