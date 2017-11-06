var socket_server = connectToUserSocket();
var robot_ip = "http://raspberrypi3-a.student.iastate.edu";
/*
socket_server.on('Robot Address', function(data){
  robot_ip = data.ip;
});
*/

//Redirect user as instructed by server
socket_server.on('redirect', function(destination) {
  window.location.href = destination;
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

var bodySelect = d3.select('body').select('svg');
var svgSelect = bodySelect.append('svg')
	.attr('width', '50')
	.attr('height', '50');
	

window.addEventListener("load", function(){
  
  var buttonUp = document.getElementById('buttonUp');
  var buttonLeft = document.getElementById('buttonLeft');
  var buttonRight = document.getElementById('buttonRight');
  var buttonDown = document.getElementById('buttonDown');
  var buttonFire = document.getElementById('buttonFire');

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
	  fireMahLazer();
      socket_robot.emit('Serial Movement', { dir: 'K'});
  });
  buttonFire.addEventListener('mouseup', function() {
      console.log("k");
	  svgSelect.selectAll('circle').remove();
      socket_robot.emit('Serial Movement', { dir: 'k'});
  });
  
  function fireMahLazer(){
	  setInterval(function(){
		  time += 100;
		  elapsed = Math.floor(time / 100) / 10;
		  if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
		  svgSelect.append('circle')
			.attr('cx', '50%')
			.attr('cy', '35%')
			.attr('width', elapsed*5)
			.attr('height', elapsed*5);

		}, 100);
  }
  
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

});