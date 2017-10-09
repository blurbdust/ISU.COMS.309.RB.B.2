var io_RPI = require("socket.io").listen(5210); //Operators connect to this
var io = require("socket.io-client");	//Central Server connection
var sleep = require('system-sleep');
const LiveCam = require('livecam');
const webcam_server = new LiveCam({
	'start' : function(){
		console.log('WebCam server started!');
	}
	'ui_addr' : '127.0.0.1',
    'ui_port' : 11000,
 
    'broadcast_addr' : '127.0.0.1',
    'broadcast_port' : 12000,
 
    'gst_tcp_addr' : '127.0.0.1',
    'gst_tcp_port' : 10000,
});

var io_CS = io.connect('proj-309-rb-b-4.cs.iastate.edu:3001');
var operator;

var SerialPort = require('serialport');
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
});

io_CS.on('connect', function(){
	console.log("Connected to Central Server");
	
});

io_RPI.on('connection', function(socket){
	
	socket.on('Serial Movement', function(data){
		serialPort.write(data.dir);
	});

	socket.on('disconnect', function () {
      console.log('A user disconnected');
	});
});


