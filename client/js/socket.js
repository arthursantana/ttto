'use strict';

angular.module('ttt')
.service('Socket', function ($rootScope) {
         
   var socket = io();

   return {
      on: function (event, callback) {
         socket.on(event, function () {  
            $rootScope.$apply(callback.apply(socket, arguments));
         });
      },
      emit: function (event, data, callback) {
         socket.emit(event, data, function () {
            if (callback)
               $rootScope.$apply(callback.apply(socket, arguments));
         })
      }
   };
});
