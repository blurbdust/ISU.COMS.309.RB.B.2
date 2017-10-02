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