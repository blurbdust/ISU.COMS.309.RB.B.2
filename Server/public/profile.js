//Connect to socket
var socket = connectToUserSocket();

//Redirect user as instructed by server
socket.on('redirect', function(destination) {
	window.location.href = destination;
});

socket.emit('request profile info', getCookie("username"));

socket.on('profile info', function(data) {
	
	document.getElementById('username').innerHTML = data.username;
	document.getElementById('displayName').innerHTML = data.displayName;
	document.getElementById('bio').innerHTML = data.bio;
	
	if (data.onlineStatus == true) {
		document.getElementById('onlineStatus').innerHTML = "Online";
		document.getElementById('onlineStatus').style.color = "green";
	}
	else {
		document.getElementById('onlineStatus').innerHTML = "Offline";
		document.getElementById('onlineStatus').style.color = "red";
	}
	
	//Set edit buttons
	if (data.username == getCookie("username")) {
		document.getElementById('displayNameButton').innerHTML = "<button onclick='editDisplayName();'>Edit</button>";
		document.getElementById('bioButton').innerHTML = "<button onclick='editBio();'>Edit</button>";
	}
	else {
		document.getElementById('displayNameButton').innerHTML = "";
		document.getElementById('bioButton').innerHTML = "";
	}
	
	//Set profile picture
	var urlBase = "http://proj-309-rb-b-2.cs.iastate.edu:3000/avatars/";
	var url = "";
	if (urlExists(urlBase + data.ID + ".png")) {
		url = urlBase + data.ID + ".png";
	}
	else if (urlExists(urlBase + data.ID + ".jpg")) {
		url = urlBase + data.ID + ".jpg";
	}
	else if (urlExists(urlBase + data.ID + ".jpeg")) {
		url = urlBase + data.ID + ".jpeg";
	}
	else {
		url = urlBase + "default.jpg";
	}
	document.getElementById('profilePic').innerHTML = '<img src="' + url + '" class="avatar" alt="Profile Image"/>'
});

function editDisplayName() {
	var displayName = prompt("Enter your new display name:", "Harry Potter");
	displayName = displayName.replace("'", "\'");
	socket.emit ('edit display name', displayName);
	socket.emit('request profile info', getCookie("username"));
}

function editBio() {
	var bio = prompt("Enter your new bio:", "I am the chosen one!");
	bio = bio.replace("'", "\'");
	socket.emit ('edit bio', bio);
	socket.emit('request profile info', getCookie("username"));
}


function urlExists(url) {
	var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}
		
		