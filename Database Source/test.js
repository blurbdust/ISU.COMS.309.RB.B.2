var express = require("express");
var app = express();
var port = 3000;
 
app.get("/login", (req, res) => {
 res.sendFile(__dirname + "/login.html");
}); 

app.get("/create_account", (req, res) => {
 res.sendFile(__dirname + "/create_account.html");
}); 

//Public folder to serve files
app.use(express.static(__dirname + '/public'));
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});

var mysql = require('mysql');

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