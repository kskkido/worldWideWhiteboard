var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');

    whiteboard.on('draw', function(start, end, color, shouldBroadcast = true){
      socket.emit('sent', start, end, color, shouldBroadcast)
    })

    socket.on('drawHistory', function (drawHistory) {
      drawHistory.forEach(function(pastDraw) {
        console.log(pastDraw)
        whiteboard.draw(pastDraw.start, pastDraw.end, pastDraw.color)
      })
    })

    socket.on('received', function(start, end, color, shouldBroadcast) {
      whiteboard.draw(start, end, color, shouldBroadcast)
    })


});


// socket.on('draw', function(start, end, color) {
//   window.whiteboard.draw(start, end, strokeColor, shouldBroadcast = true)
// })
