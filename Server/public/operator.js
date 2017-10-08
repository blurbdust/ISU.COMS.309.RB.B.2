
var socket = io('http://localhost:521');

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
  
});