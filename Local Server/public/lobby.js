var userSocket = io.connect('http://proj-309-rb-b-2.cs.iastate.edu:3000');

userSocket.on('user', function(user) {
	console.log(user);
});