var http = require('http');
var fs = require('fs');
var admin = fs.readFileSync('html_test1.html');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(admin);
}).listen(8080); 