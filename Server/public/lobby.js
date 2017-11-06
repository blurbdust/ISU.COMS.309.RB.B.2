//Connect to socket
var socket = connectToUserSocket();

//Redirect user as instructed by server
socket.on('redirect', function(destination) {
	window.location.href = destination;
});

//Chat Box
$(function () {
	$('#msgform').submit(function(){
	  socket.emit('chat message', $('#m').val());
	  $('#m').val('');
	  return false;
	});
	socket.on('chat message', function(msg){
	  $('#messages').append($('<li><strong>' + msg.username + ":</strong> " + msg.message + '</li>'));
	  var chatDiv = document.getElementById("chat-box");
	  chatDiv.scrollTop = chatDiv.scrollHeight;
	});
});

//Display connected users
socket.on('usernames', function(data) {

	var html = '';
	for (i = 0; i < data.length; i++) {
		html += data[i] + '<br/>';
	}
	document.getElementById("users").innerHTML = html;
});

//Display connected users
socket.emit('request robot list');
socket.on('robotInfo', function(data) {
	var html = '';
	for (i = 0; i < data.length; i++) {
		html += data[i].name + '<br/>';
	}
	document.getElementById("robots").innerHTML = html;
});