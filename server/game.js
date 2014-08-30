'use strict';

var colWon = function (m, c) {
   if (m[0][c] == m[1][c] && m[0][c] == m[2][c])
      return m[0][c];
   else return false
};

var rowWon = function (m, r) {
   if (m[r][0] == m[r][1] && m[r][0] == m[r][2])
      return m[r][0];
   else return false
};

var diaWon = function (m, d) {
   var a, b;

   if (d == 0) {
      a = 0;
      b = 2;
   }
   else {
      a = 2;
      b = 0;
   }

   if (m[0][a] == m[1][1] && m[1][1] == m[2][b])
      return m[1][1];
   else return false
};

var full = function (m) {
   for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
         if (m[i][j] == ' ')
            return false;
      }
   }

   return true;
};

var reset = function (m) {
   for(var i=0; i<3; i++) {
      m[i] = [];
      for(var j=0; j<3; j++) {
         m[i][j] = ' ';
      }
   }
}

module.exports = function () {
   var map = [];
   reset(map);

   var turn = 'X';

   return {
      map: map,

      getTurn: function () {
         return turn;
      },

      play: function (x, y, a) {
         if (a != turn)
            return false;

         if (map[x][y] == ' ')
            map[x][y] = turn;

         if (turn == 'X')
            turn = 'O';
         else
            turn = 'X';

         return true;
      },

      isOver: function () {
         var winner;

         if (winner = rowWon(map, 0))
            return winner;
         if (winner = rowWon(map, 1))
            return winner;
         if (winner = rowWon(map, 2))
            return winner;

         if (winner = colWon(map, 0))
            return winner;
         if (winner = colWon(map, 1))
            return winner;
         if (winner = colWon(map, 2))
            return winner;

         if (winner = diaWon(map, 0))
            return winner;
         if (winner = diaWon(map, 1))
            return winner;

         if (full(map))
            return 'full';

         return false;
      },

      reset: function () {
         reset(map);

         turn = 'X';
      }
   };
}();
