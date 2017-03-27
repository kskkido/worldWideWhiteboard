var path = require('path');
var express = require('express');
var app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!
var socketio = require('socket.io');

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
var server = app.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

server.on('request', app);
var io = socketio(server);
var drawHistory = []
io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    socket.emit('drawHistory', drawHistory)
    console.log('A new client has connected!');
    console.log(socket.id);
    var id = socket.id;

    socket.on('disconnect', function(html){
      html = html
    })

    socket.on('sent', function(start, end, color, shouldBroadcast) {
      drawHistory.push({start: start, end: end, color: color})
      socket.broadcast.emit('received', start, end, color, shouldBroadcast)
    })
});





app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
