//Connect to socket
var socket = connectToUserSocket();

//Redirect user as instructed by server
socket.on('redirect', function(destination) {
	window.location.href = destination;
});

//Set ID cookie
socket.emit('request user id', getCookie('username'));
socket.on('get user id', function(id) {
	document.cookie = "ID=" + id + "; path=/";
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

//Operator page(s) redirect
document.getElementById("operatorButton").addEventListener("click", function(){
    socket.emit("request-for-redirect", getCookie("username"));
});

//Display connected users
socket.on('usernames', function(data) {

	var html = '';
	for (i = 0; i < data.length; i++) {
		html += data[i] + '<br/>';
	}
	document.getElementById("users").innerHTML = html;
});

//Display connected robots
socket.emit('request robot list');
socket.on('robotInfo', function(data) {
	var html = '';
	for (i = 0; i < data.length; i++) {
		
		//Robot name
		html += '<span style="font-size: 22px">' + data[i].name + '</span><br/>';
		
		//Gunner
		html += "<span style='font-size: 18px' id='gunner" + i + "'>Gunner: "
		if (data[i].gunner != "")
			html += data[i].gunner + "</span><br/>";
		else {
			var varString = '' + i + ', "gunner"';
			html += "<button type='button' onclick='setOperator(" + varString + ");'>Join</button></span><br/>";
		}
		
		//Driver
		html += "<span style='font-size: 18px' id='driver" + i + "'>Driver: "
		if (data[i].driver != "")
			html += data[i].driver + "</span><br/>";
		else {
			var varString = '' + i + ', "driver"';
			html += "<button type='button' onclick='setOperator(" + varString + ");'>Join</button></span><br/>";
		}
		html += '<br />';
	}
	document.getElementById("robots").innerHTML = html;
});

function setOperator(index, operatorType) {
	var obj = {'username':getCookie("username"), 'robotIndex':index, 'operatorType':operatorType};
	document.cookie = "robotIndex=" + index + "; path=/";
	document.cookie = "operatorType=" + operatorType + "; path=/";
	socket.emit('set user operator', obj);
	var opType = "";
	if (operatorType == "driver")
		opType = "Driver";
	else
		opType = "Gunner";
	document.getElementById("" + operatorType + index).innerHTML = "<span style='font-size: 18px'>" + opType + ": " + obj.username + "</span>";
	
}