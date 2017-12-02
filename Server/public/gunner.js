/*var socket_server = connectToUserSocket();
var robot_ip = "http://raspberrypi3-a.student.iastate.edu";

socket_server.on('Robot Address', function(data){
  robot_ip = data.ip;
});


//Redirect user as instructed by server
socket_server.on('redirect', function(destination) {
  window.location.href = destination;
});


//Reset user operator
var obj = {'username':getCookie("username"), 'robotIndex':getCookie("robotIndex"), 'operatorType':getCookie("operatorType")};
socket_server.emit('set user operator', obj);

socket_server.emit("request-robotIP", function(){
  console.log("Requested robotIP");
});

socket_server.on("robotIP", function(data){
  robot_ip = data;
});

var socket_robot = io(robot_ip + ':5210');


//Chat Box
$(function () {
  $('#msgform').submit(function(){
    socket_server.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket_server.on('chat message', function(msg){
    $('#messages').append($('<li><strong>' + msg.username + ":</strong> " + msg.message + '</li>'));
    var chatDiv = document.getElementById("chat-box");
    chatDiv.scrollTop = chatDiv.scrollHeight;
  });
});

*/

window.addEventListener("load", function(){
  
  
  var buttonUp = document.getElementById('buttonUp');
  var buttonLeft = document.getElementById('buttonLeft');
  var buttonRight = document.getElementById('buttonRight');
  var buttonDown = document.getElementById('buttonDown');
  var buttonFire = document.getElementById('buttonFire');
  var logout = document.getElementById('logout');
  var lobby = document.getElementById('lobby');
  
  
  buttonUp.addEventListener('mousedown', function() {
      console.log("I");
      socket_robot.emit('Serial Movement', { dir: 'I'});
  });
  buttonUp.addEventListener('mouseup', function() {
      console.log("i");
      socket_robot.emit('Serial Movement', { dir: 'i'});
  });
  
  
  
  buttonLeft.addEventListener('mousedown', function() {
      console.log("J");
      socket_robot.emit('Serial Movement', { dir: 'J'});
  });
  buttonLeft.addEventListener('mouseup', function() {
      console.log("j");
      socket_robot.emit('Serial Movement', { dir: 'j'});
  });
  
  
  
  buttonRight.addEventListener('mousedown', function() {
      console.log("L");
      socket_robot.emit('Serial Movement', { dir: 'L'});
  });
  buttonRight.addEventListener('mouseup', function() {
      console.log("l");
      socket_robot.emit('Serial Movement', { dir: 'l'});
  });  
  
  
  buttonDown.addEventListener('mousedown', function() {
      console.log("M");
      socket_robot.emit('Serial Movement', { dir: 'M'});
  });
  buttonDown.addEventListener('mouseup', function() {
      console.log("m");
      socket_robot.emit('Serial Movement', { dir: 'm'});
  });

  buttonFire.addEventListener('mousedown', function() {
      console.log("K");
	  
	  var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 20;
	  context.beginPath();
	  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	  context.lineWidth = 1;
	  context.strokeStyle = 'red';
	  context.stroke();
	  
	  for(var i=0; i < 3; i++){
		setTimeout(function(){
			radius -= 5;
			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			context.lineWidth = 1;
			context.strokeStyle = 'red';
			context.stroke();
			if(radius == 5){
				context.fillStyle = 'red';
				context.fill();
			}
			
		}, ((i+1)*1000));
	  }
			
		
      socket_robot.emit('Serial Movement', { dir: 'K'});
  });
  buttonFire.addEventListener('mouseup', function() {
      console.log("k");
	  
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);


	  
      socket_robot.emit('Serial Movement', { dir: 'k'});
  });
  
  var webcam_addr = "raspberrypi3-a.student.iastate.edu";
  var webcam_port = "12000";
  var webcam_host = $(".feed img");
  var cam_socket = io.connect('http://' + webcam_addr + ':' + webcam_port);


  cam_socket.on("connection", function(socket){
    console.log("Connected to camera");
  });

  cam_socket.on('image', function (data) {
    webcam_host.attr("src", "data:image/jpeg;base64," + data );
  });

  logout.addEventListener('mouseup', function(){
    console.log("Logging out...");
    window.location.href = 'http://proj-309-rb-b-2.cs.iastate.edu:3000/';
    //Update Database with Robot score
  });

  lobby.addEventListener('mouseup', function(){
    console.log("Redirecting back to lobby");
    window.location.href = 'http://proj-309-rb-b-2.cs.iastate.edu:3000/lobby';
  });

});