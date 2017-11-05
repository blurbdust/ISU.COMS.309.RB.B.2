var io = require('socket.io-client');

var socket = io.connect('http://proj-309-rb-b-2.cs.iastate.edu:3000', {
	transports: ["websockets", "polling"],
	reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10
});	//Central Server connection

var http = require('http');
var express = require('express');
var app = express();
var sleep = require('system-sleep');
//const LiveCam = require('livecam');
/*const webcam_server = new LiveCam({
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

});*/
var server = app.listen(5210);
var io_RPI = require("socket.io").listen(server); //Operators connect to this
//io_RPI.emit('new robot', 'Robot 1');	//Placeholder robot name

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

socket.on('connect', function(){
	console.log("Connected to Central Server");
	socket.emit('new robot', "Robot 1", function(){
		console.log("Sent I'm a robot");
	});
});

socket.on('error', function(){
	console.log("Central Server Error");
});

socket.on('disconnect', function(){
	console.log("Disconnected From Central Server");
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

//webcam_server.broadcast();

