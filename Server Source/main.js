const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client){
	console.log("Server recieved connection!");
	client.on('event', function(data){
		client.broadcast.emit('new message', {
			username: client.username,
			message: data
		});
	});
	client.on('disconnect', function(){
		console.log("Server recieved disconnect!");
	});
});

server.listen(3000);

function createWindow () {
	mainWindow = new BrowserWindow({width: 800, height: 600});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});
