var io_RPI = require("socket.io").listen(80); 
var io = require("socket.io-client");


var operator;

var io_CS = io.connect('proj-309-am-b-4.cs.iastate.edu:80');

io_CS.on('connect', function () {
	console.log("Connected to Central Server");
	
});

io_RPI.on('connection', function(socket){
	operator = socket;
});
