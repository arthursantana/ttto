'use strict';

angular.module('ttt')
.controller('MainCtrl', ['$scope', 'Socket', function (scope, socket) {
   scope.action = "waiting";
   scope.wins = 0;
   scope.turn = 'God';
   scope.people = -1;

   scope.map = [];
   for(var i=0; i<3; i++) {
       scope.map[i] = [];
       for(var j=0; j<3; j++) {
          scope.map[i][j] = "";
       }
   }

   socket.on('wins', function (wins){
      console.log('Got wins from server.')
      scope.wins = wins;
   });

   socket.on('newMap', function (m){
      socket.emit('getMap');
   });

   socket.on('roomUpdate', function (p){
      console.log('Got room update from server.')
      scope.people = p;
   });

   socket.on('map', function (m){
      console.log('Got map and turn from server.')
      scope.map = m.map;
      scope.turn = m.turn;
   });

   socket.on('action', function (action){
      console.log('Got action from server.')
      switch (action) {
         case 'X': scope.action = 'playing X'
         break;
         case 'O': scope.action = 'playing O'
         break;
         default: scope.action = 'just watching'
      }
   });

   scope.play = function (x,y) {
      console.log('Playing (' + x + ', ' + y + ').')
      socket.emit('play', {x: x, y: y});
   };
}]);
