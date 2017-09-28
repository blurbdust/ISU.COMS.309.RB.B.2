var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "cybotAdmin",
  password: "fightingmongooses",
  database: "cybots"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});