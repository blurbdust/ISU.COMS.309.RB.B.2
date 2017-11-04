var io = require("socket.io-client");	//Central Server connection
var sleep = require('system-sleep');
const LiveCam = require('livecam');
const webcam_server = new LiveCam({
	'ui_addr' : '0.0.0.0',
	'ui_port' : 11000,
	'broadcast_addr' : '0.0.0.0',
	'broadcast_port' : 12000,
	'gst_tcp_addr' : '0.0.0.0',
	'gst_tcp_port' : 10000,
	'start' : function(){
		console.log('WebCam server started!');
	},
	'webcam': {
		'width': 320,
		'height': 240,
		'framerate': 5
	}

});
var io_RPI = require("socket.io").listen(5210); //Operators connect to this




var io_CS = io.connect('proj-309-rb-b-2.cs.iastate.edu:3001', {reconnect: true});
var operator;

/*var SerialPort = require('serialport');
var serialPort = new SerialPort("/dev/ttyACM0",{
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
});*/

io_CS.on('connect', function(){
	console.log("Connected to Central Server");
});

io_RPI.on('connection', function(socket){

	console.log("User connected");
	socket.on('Serial Movement', function(data){
		serialPort.write(data.dir);

		console.log("Writing: " + data.dir);
	});

	socket.on('disconnect', function () {
		console.log('A user disconnected');

	});
});

webcam_server.broadcast();

