'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var game = require('./game');

var Xlocked = false;
var Olocked = false;
var people = 0;

var requestAction = function () {
   if (!Xlocked) {
      Xlocked = true;
      return 'X';
   }
   else if (!Olocked) {
      Olocked = true;
      return 'O';
   }
   else return 'W';
};

var releaseAction = function (a) {
   if (a == 'X')
      Xlocked = false;
   else if (a == 'O')
      Olocked = false;
};

app.get('/', function(req, res){
  res.sendfile('client/index.html');
});

app.use(express.static('client'));

io.on('connection', function(socket){
  var address = socket.handshake.address.address + ':' + socket.handshake.address.port;

  var wins = 0;

  var action = requestAction();
  socket.emit('action', action);

  people++;

  io.emit('roomUpdate', people);

  console.log(address + ' connected');

  io.emit('newMap', game.map);

  socket.on('getMap', function () {
     console.log(address + ' asked for the map.');
     io.emit('map', {map: game.map, turn: game.getTurn()});
  });

  socket.on('play', function (m) {
     console.log(address + ' wants to play (' + m.x + ', ' + m.y + ').');
     if (game.play(m.x, m.y, action)) {
        var winner = game.isOver();

        if (winner != false) {
           console.log('winner: ' + winner);

           if (action == winner) {
              wins++;
              socket.emit('wins', wins)
           }
           game.reset();
        }
     } else {
        console.log('but it\'s not ' + address + '\'s turn.');
     }
     io.emit('newMap', game.map);
  });

  socket.on('disconnect', function(){
     console.log(address + ' disconnected');
     releaseAction(action);

     people--;
     io.emit('roomUpdate', people);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
