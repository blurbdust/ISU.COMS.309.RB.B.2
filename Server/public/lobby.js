//Connect to socket
var socket = connectToUserSocket();

//Display connected users
socket.on('usernames', function(data) {

	var html = '';
	for (i = 0; i < data.length; i++) {
		html += data[i] + '<br/>';
	}
	document.getElementById("users").innerHTML = html;
});

//Redirect user as instructed by server
socket.on('redirect', function(destination) {
	window.location.href = destination;
});