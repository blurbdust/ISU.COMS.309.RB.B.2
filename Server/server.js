var express = require("express");
var app = express();
var port = 3000;
var userServer = require('http').createServer(app);
var userIO = require('socket.io')(userServer);

var robotListen = require('http').createServer(app);

var robotIO = require('socket.io')(robotListen);
var bodyParser = require('body-parser');
var mysql = require('mysql');
var users = [];
var usernames = [];
var robots = [];
var robotIPList = [];

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

//Public folder to serve files
app.use(express.static(__dirname + '/public'));
 
//Listen on port
userServer.listen(port, () => {
 console.log("User server listening on port " + port);
});

robotListen.listen(3001, () => {
 console.log("Robot server listening on port " + 3001);
});



app.get('/', function(req, res){
	res.redirect('http://proj-309-rb-b-2.cs.iastate.edu:' + port + '/' + 'login');
});

app.get('/socket.io/socket.io.js', function(req, res){
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
		else{
			console.log(path.resolve(__dirname));
			res.sendFile(path.resolve(__dirname + '/lobby.html'));
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

userIO.on('connection', function(socket){
	console.log("User connected");
	
	socket.on('new user', function(data) {
		socket.username = data;
		usernames.push(socket.username);
		users.push(socket);
		userIO.sockets.emit('usernames', usernames);
			
	});
	socket.on('disconnect', function() {
		console.log("User disconnected");
		users.splice(users.indexOf(socket), 1);
		if (socket.username)
			usernames.splice(usernames.indexOf(socket.username), 1);
		userIO.sockets.emit('usernames', usernames);
	});
	socket.emit('Robot Address', { ip: robotIPList[0]});
});

robotIO.on('connection',function(socket) {
	console.log("Robot connected");
	robots.push(socket);
	robotIPList.push(socket.request.connection.remoteAddress);
	console.log(robotIPList[0]);
});
