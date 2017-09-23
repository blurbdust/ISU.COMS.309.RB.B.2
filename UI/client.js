function connectToServer(){
	var socket = io.connect('http://localhost');
	socket.on('connection', function(){
		socket.emit('Client');
	});
}


function sendSerial(dir){
	socket.emit('Serial Movement', {
		direction: dir,
	});
}