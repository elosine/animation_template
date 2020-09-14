var express = require('express');
var app = express();
var path = require('path');
var timesyncServer = require('timesync/server');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// handle timesync requests
app.use('/timesync', timesyncServer.requestHandler);

//socket.io
io.on('connection', function(socket) {
  socket.on('createEvents', function(data) {
    socket.emit('createEventsBroadcast', {
      eventdata: data.eventdata,
    });
  });
  socket.on('startpiece', function(data) {
    socket.emit('startpiecebroadcast', {});
  });
  socket.on('pause', function(data) {
    socket.emit('pauseBroadcast', {
      pauseState: data.pauseState,
      pauseTime: data.pauseTime
    });
  });
  // LOAD PIECE
  socket.on('loadPiece', function(data) {
    console.log(data.eventsArray);
    socket.emit('loadPieceBroadcast', {
      eventsArray: data.eventsArray
    });
  });
});
