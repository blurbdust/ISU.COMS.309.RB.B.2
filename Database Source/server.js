var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var mysql = require('mysql');
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
app.use(express.static(path.resolve(__dirname + '/public')));
 
//Listen on port
app.listen(port, () => {
 console.log("Server listening on port " + port);
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
		if (err) throw err
		else if (result.length == 0)
			res.send("User does not exist in the database.");
		else if (result[0].Password != password)
			res.send("Incorrect password.");
		else
			res.send("Success");
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
				res.send("User created!");
				res.sendFile(path.resolve(__dirname + '/login.html'));
			}
		});
	});
	
	
});