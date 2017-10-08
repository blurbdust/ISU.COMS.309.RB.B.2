var io_RPI = require("socket.io").listen(521); //Operators connect to this
var io = require("socket.io-client");	//Central Server connection
var sleep = require('system-sleep');



var io_CS = io.connect('proj-309-am-b-4.cs.iastate.edu:80');
var operator;

var SerialPort = require('serialport');
var serialPort = new SerialPort('COM3',{ 
	baudrate: 9600,
	dataBits: 8, 
    parity: 'none', 
    stopBits: 1, 
    flowControl: false
	});

serialPort.on('open', function(){
	let dir = 'w';
	console.log('Serial Port Opened');
	sleep(1000);
});

io_CS.on('connect', function(){
	console.log("Connected to Central Server");
	
});

io_RPI.on('connection', function(socket){
	console.log("Client Connected");
	socket.on('Serial Movement', function(data){
		console.log(data.dir)
		serialPort.write(data.dir);
	});
	
	socket.on('disconnect', function () {
      console.log('A user disconnected');
	});
});


