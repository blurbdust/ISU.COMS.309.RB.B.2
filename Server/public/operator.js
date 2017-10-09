var socket_server = io('http://proj-309-rb-b-2.cs.iastate.edu:3000');
var robot_ip = "";
socket_server.on('Robot Address', function(data){
	robot_ip = data.ip;
});

var vid = document.getElementByID("videoPlayer");
vid.onloadstart = function() {
	document.getElementById("robotVidSrc").src = robot_ip + ":11000";
}

var socket_robot = io(robot_ip + ':5210');

window.addEventListener("load", function(){
	
  var buttonUp = document.getElementById('buttonUp');
  var buttonLeft = document.getElementById('buttonLeft');
  var buttonRight = document.getElementById('buttonRight');
  var buttonDown = document.getElementById('buttonDown');

  buttonUp.addEventListener('mousedown', function() {
      console.log("w");
      socket.emit('Serial Movement', { dir: 'w'});
  });
  buttonUp.addEventListener('mouseup', function() {
      console.log("x");
      socket.emit('Serial Movement', { dir: 'x'});
  });
  
  
  
  buttonLeft.addEventListener('mousedown', function() {
      console.log("a");
      socket.emit('Serial Movement', { dir: 'a'});
  });
  buttonLeft.addEventListener('mouseup', function() {
      console.log("x");
      socket.emit('Serial Movement', { dir: 'x'});
  });
  
  
  
  buttonRight.addEventListener('mousedown', function() {
      console.log("d");
      socket.emit('Serial Movement', { dir: 'd'});
  });
  buttonRight.addEventListener('mouseup', function() {
      console.log("x");
      socket.emit('Serial Movement', { dir: 'x'});
  });  
  
  
  buttonDown.addEventListener('mousedown', function() {
      console.log("s");
      socket.emit('Serial Movement', { dir: 's'});
  });
  buttonDown.addEventListener('mouseup', function() {
      console.log("x");
      socket.emit('Serial Movement', { dir: 'x'});
  });
  
    var webcam_addr = "192.168.1.145";
	var webcam_port = "12000";
	var webcam_host = $(".feed img");
	var cam_socket = io.connect('http://' + webcam_addr + ':' + webcam_port);


	cam_socket.on("connection", function(socket){
		console.log("Connected");
	});

	cam_socket.on('image', function (data) {
		webcam_host.attr("src", "data:image/jpeg;base64," + data );
	});

  
  
  
});