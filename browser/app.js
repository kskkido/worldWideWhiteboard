var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});


// window.whiteboard.on('draw', function(start, end, color){
//   console.log(start, end, color);
// })
