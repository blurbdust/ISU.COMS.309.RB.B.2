var express = require("express");
var app = express();
var port = 3000;
var userServer = require('http').createServer(app);
var io = require('socket.io')(userServer);
var bodyParser = require('body-parser');
var mysql = require('mysql');

var userSocketList = [];
var userNameList = [];
var dbAccountList = [];
var robotSocketList = [];
var robotInfoList = [];

const path = require('path');
const url = require('url');


//Initialize bodyParser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 
//Send login page 
app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/login.html");;
}); 

//Send Create User page
app.get("/create_account", (req, res) => {
	res.sendFile(__dirname + "/create_account.html");
}); 

app.get("/lobby", (req, res) => {
	res.sendFile(__dirname + "/lobby.html");
}); 

app.get("/admin", (req, res) => {
	res.sendFile(__dirname + "/admin.html");
});

app.get("/gunner", (req, res) => {
	res.sendFile(__dirname + "/gunner.html");
});

app.get("/driver", (req, res) => {
	res.sendFile(__dirname + "/driver.html");
}); 

app.get("/spectator", (req, res) => {
	res.sendFile(__dirname + "/spectator.html");
}); 

//Public folder to serve files
app.use(express.static(__dirname + '/public'));
 
//Listen on port
userServer.listen(port, () => {
	console.log("User server listening on port " + port);
});

app.get('/', function(req, res){
	res.redirect('http://proj-309-rb-b-2.cs.iastate.edu:' + port + '/' + 'login');
});

app.get('/socket.io/*', function(req, res){
	res.sendFile(path.resolve(__dirname + '/public/socket.io.js'));
});

app.post('/login', function(req, res) {
	var username = req.body.uname;
	var password = req.body.psw;
	
	var con = mysql.createConnection({
		host: "mysql.cs.iastate.edu",
		user: "dbu309rbb2",
		password: "Ze3xcZG5",
		database: "db309rbb2"
	});
	
	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT * FROM users WHERE Username = '" + username + "'", function (err, result, fields) {
		if (err){
			throw err;
		}
		else if (result.length == 0){
			res.send("User does not exist in the database.");
		}
		else if (result[0].Password != password){
			res.send("Incorrect password.");
		}
		else if (result[0].UserRole != null && result[0].UserRole == 1) {
			res.redirect('http://proj-309-rb-b-2.cs.iastate.edu:' + port + '/' + 'admin')
		}
		else {
			res.redirect('http://proj-309-rb-b-2.cs.iastate.edu:' + port + '/' + 'lobby');
		}
	  });
	});
	
});

app.post('/create_account', function(req, res) {
	var username = req.body.uname;
	var password = req.body.psw;
	var confirmPassword = req.body.confirmPsw;
	
	var con = mysql.createConnection({
		host: "mysql.cs.iastate.edu",
		user: "dbu309rbb2",
		password: "Ze3xcZG5",
		database: "db309rbb2"
	});

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		var sql = "INSERT INTO users (Username, Password) VALUES ('" + username + "', '" + password + "')";
		con.query(sql, function (err, result) {
			if (err && err.code == "ER_DUP_ENTRY") 
				res.send("Username already taken.");
			else if (err)
				throw err;
			else {
				console.log("1 record inserted");
				//res.send("User created!");
				res.sendFile(path.resolve(__dirname + '/login.html'));
			}
		});
	});	
});


io.on('connection', function(socket){
	
	socket.on('new user', function(data) {
		
		if (data == "")
			socket.emit('redirect', 'http://proj-309-rb-b-2.cs.iastate.edu:' + port + '/' + 'login');
		else {
			
			//Associate username with socket
			socket.username = data;
			socket.type = "User";
			console.log(socket.username + " connected");
			userNameList.push(socket.username);
			userSocketList.push(socket);
			io.sockets.emit('usernames', userNameList);
			
			//Emit all database users
			var con = mysql.createConnection({
				host: "mysql.cs.iastate.edu",
				user: "dbu309rbb2",
				password: "Ze3xcZG5",
				database: "db309rbb2"
			});
			dbAccountList = [];
			con.connect(function(err) {
				if (err) throw err;
				var sql = "SELECT * FROM users";
				con.query(sql, function(err, result, fields)  {
					if (err) throw err;
					for (i = 0; i < result.length; i++) {
						dbAccountList.push(result[i].Username);
					}
				});
			});
			setTimeout(function() {
				io.sockets.emit('dblist', dbAccountList);	
			}, 200);			
		}
	});
	
	socket.on('kick user', function(data){
		socket.emit('redirect', 'http://proj-309-rb-b-2.cs.iastate.edu:' + port + '/' + 'lobby');
	});
	
	socket.on('ban user', function(data){
		//Need to change banned field to true in DB
		
		for(var i=0;i<userSocketList.length; i++){
			if(data==userNameList[i]){
				userSocketList[i].emit('redirect', 'http://proj-309-rb-b-2.cs.iastate.edu:' + port + '/' + 'login');
			}
		}
	});
	
	socket.on('delete account', function(data){
		//Need to delete row in DB
		
	});
	socket.on('spectate', function(data){
		//Need to delete row in DB
		socket.emit('redirect', 'http://proj-309-rb-b-2.cs.iastate.edu:' + port + '/' + 'spectator');
	});
	socket.on('logout', function(data){
		socket.emit('redirect', 'http://proj-309-rb-b-2.cs.iastate.edu:' + port + '/' + 'login');
	});
	
	
	socket.on('chat message', function(msg){
		io.emit('chat message', {message: msg, username: socket.username});
	});
	
	socket.on('disconnect', function() {
		if (socket.type == "User"){
			console.log(socket.username + " disconnected");
			userSocketList.splice(userSocketList.indexOf(socket), 1);
			if (socket.username)
				userNameList.splice(userNameList.indexOf(socket.username), 1);
			io.sockets.emit('usernames', userNameList);
		}
		else if (socket.type == "Robot"){
			console.log(socket.name + " disconnected");
			robotSocketList.splice(robotSocketList.indexOf(socket), 1);
			if (socket.name) {
				var index = robotInfoList.findIndex(function(item, i) {
					return item.name === socket.name;
				});
				robotInfoList.splice(index, 1);
			}
			io.sockets.emit('robotInfo', robotInfoList);
		}
	});
	
	socket.on('request robot list', function() {
		io.emit('robotInfo', robotInfoList)
	});
	
	socket.on('request robot ip', function(data){
		
	});
		
	socket.on('new robot', function(data) {

		console.log("Got a robot connection");
		
		//Set robot name, users, and IP in socket
		socket.name = data;
		socket.type = "Robot";
		socket.gunner = "";
		socket.driver = "";
		socket.spectators = [];
		socket.IP = socket.request.connection.remoteAddress;
		robotSocketList.push(socket);
		console.log('Robot Name: ' + socket.name + ' Robot IP: ' + socket.IP);
		
		//Emit robot info to client
		var robot = {'name':socket.name, 'gunner':socket.gunner, 'driver':socket.driver};
		robotInfoList.push(robot);
		io.sockets.emit('robotInfo', robotInfoList);
	});
});
