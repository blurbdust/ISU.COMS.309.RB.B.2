var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var mysql = require('mysql');


//Initialize bodyParser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 
 
//Send login page 
app.get("/login", (req, res) => {
 res.sendFile(__dirname + "/login.html");
}); 

//Send Create User page
app.get("/create_account", (req, res) => {
 res.sendFile(__dirname + "/create_account.html");
}); 

//Public folder to serve files
app.use(express.static(__dirname + '/public'));
 
//Listen on port
app.listen(port, () => {
 console.log("Server listening on port " + port);
});

var con = mysql.createConnection({
  host: "mysql.cs.iastate.edu",
  user: "dbu309rbb2",
  password: "Ze3xcZG5",
  database: "db309rbb2"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post('/login', function(req, res) {
	var username = req.body.uname;
	var password = req.body.psw;
	
	console.log("Username: " + username);
	console.log("Password: " + password);
	
	
});

app.post('/create_account', function(req, res) {
	var username = req.body.uname;
	var password = req.body.psw;
	var confirmPassword = req.body.confirmPsw;
	
	console.log("Username: " + username);
	console.log("Password: " + password);
	console.log("Confirm Password: " + confirmPassword);
	
	
});