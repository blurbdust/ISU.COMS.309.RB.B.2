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
  var sql = "INSERT INTO users (Username, Password, UserRole) VALUES ('user123', 'password1', 2)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});