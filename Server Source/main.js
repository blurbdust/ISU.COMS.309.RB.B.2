const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

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

console.log("Starting Server...");

server.listen(3000);

console.log("Server Started!");
function createWindow () {
	mainWindow = new BrowserWindow({width: 1024, height: 720});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '../UI/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	console.log(__dirname);
	
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

function login(){
	console.log("Switching to operator_page");
	//window.location.href = path.join(__dirname, './operator_page.html');
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '../UI/operator_page.html'),
		protocol: 'file:',
		slashes: true
	}));
}

app.on('ready', createWindow);

ipcMain.on('test', function(message){
	console.log("Recieved login request");
	console.log("ACCESS GRANTED!")
	login();
});

ipcMain.on('command', function(event, message){
	console.log(message);
});

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
