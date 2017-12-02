//Connect to socket
var socket = connectToUserSocket();

//Redirect user as instructed by server
socket.on('redirect', function(destination) {
	window.location.href = destination;
});

function testFunction() {
	alert('This button was clicked');
}