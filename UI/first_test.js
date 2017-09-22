var http = require('http');
var fs = require('fs');
//var admin = fs.readFileSync('html_test1.html');
var socket = require('socket.io')(server);

socket.on('connection', function(){
	socket.emit('new message', {
		username: "yooo",
		message: "Greetings!"
	});
});

//http.createServer(function (req, res) {
//    res.writeHead(200, {'Content-Type': 'text/html'});
//    res.end(admin);
//}).listen(8080); 