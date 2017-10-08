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