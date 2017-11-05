
var socket = io('http://localhost:521');

window.addEventListener("load", function(){
	
  var buttonUp = document.getElementById('buttonUp');
  var buttonLeft = document.getElementById('buttonLeft');
  var buttonRight = document.getElementById('buttonRight');
  var buttonDown = document.getElementById('buttonDown');
  var buttonFire = document.getElementById('buttonFire');

  buttonUp.addEventListener('mousedown', function() {
      console.log("I");
      socket.emit('Serial Movement', { dir: 'I'});
  });
  buttonUp.addEventListener('mouseup', function() {
      console.log("i");
      socket.emit('Serial Movement', { dir: 'i'});
  });
  
  
  
  buttonLeft.addEventListener('mousedown', function() {
      console.log("J");
      socket.emit('Serial Movement', { dir: 'J'});
  });
  buttonLeft.addEventListener('mouseup', function() {
      console.log("j");
      socket.emit('Serial Movement', { dir: 'j'});
  });
  
  
  
  buttonRight.addEventListener('mousedown', function() {
      console.log("L");
      socket.emit('Serial Movement', { dir: 'L'});
  });
  buttonRight.addEventListener('mouseup', function() {
      console.log("l");
      socket.emit('Serial Movement', { dir: 'l'});
  });  
  
  
  buttonDown.addEventListener('mousedown', function() {
      console.log("M");
      socket.emit('Serial Movement', { dir: 'M'});
  });
  buttonDown.addEventListener('mouseup', function() {
      console.log("m");
      socket.emit('Serial Movement', { dir: 'm'});
  });

  buttonFire.addEventListener('mousedown', function() {
      console.log("K");
      socket.emit('Serial Movement', { dir: 'K'});
  });
  buttonFire.addEventListener('mouseup', function() {
      console.log("k");
      socket.emit('Serial Movement', { dir: 'k'});
  });
  
});