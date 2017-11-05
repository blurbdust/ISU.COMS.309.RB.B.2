//Connect to socket
var socket = connectToUserSocket();

//Redirect user as instructed by server
socket.on('redirect', function(destination) {
	window.location.href = destination;
});


/*var bodySelect = d3.select("body").select("#layout");
var svgSelect = bodySelect.append("svg")
				.attr("preserveAspectRatio", "xMinYMin meet")
				.attr("viewBox", "0 0 1200 800")
				.classed("svg-content-responsive", true); 

				
var logoGroup = svgSelect.append('g');
var menuGroup = svgSelect.append('g');
var bannerGroup =  svgSelect.append('g');
var mainGroup = svgSelect.append('g');
var robotTextGroup = svgSelect.append('g');
var userTextGroup = svgSelect.append('g');
var dbTextGroup = svgSelect.append('g');

var logoBack = logoGroup
	.append('rect')
	.attr('height', '13%')
	.attr('width', '100%')
	.attr('x','15%')
	.attr('y','0')
	.style('fill', '#f0f0f0')
	.attr('stroke-width', 10)
	.attr('stroke','#bababa');
	
var logoImage = logoGroup
	.append('image')
	.attr('href', 'logo.png')
	.attr('alt', 'logo')
	.attr('height', '12%')
	.attr('width', '85%')
	.attr('x','0')
	.attr('y','5');
	
var logoutButton = logoGroup
	.append('rect')
	.attr('height', '4%')
	.attr('width', '7%')
	.attr('x','90%')
	.attr('y','3%')
	.style('fill', '#284a85')
	.attr('stroke-width', 5)
	.attr('stroke','#bababa');


var menuBar = menuGroup.append('rect')
	.attr('x','0')
	.attr('y','0')
	.attr('width','15%')
	.attr('height','100%')
	.style('fill', '#284a85');
	
var bannerBar = bannerGroup.append('rect')
	.attr('x','0')
	.attr('y','13%')
	.attr('width','100%')
	.attr('height','7%')
	.style('fill', '#284a85');
	
var mainBox = mainGroup.append('rect')
	.attr('x','15%')
	.attr('y','20%')
	.attr('width','100%')
	.attr('height','100%')
	.style('fill', '#bababa');
	
var robotBox = mainGroup.append('rect')
	.attr('x','16%')
	.attr('y','22%')
	.attr('width','27%')
	.attr('height','100%')
	.style('fill', '#f0f0f0');
	
var userBox = mainGroup.append('rect')
	.attr('x','44%')
	.attr('y','22%')
	.attr('width','27%')
	.attr('height','100%')
	.style('fill', '#f0f0f0');
	
var dbBox = mainGroup.append('rect')
	.attr('x','72%')
	.attr('y','22%')
	.attr('width','27%')
	.attr('height','100%')
	.style('fill', '#f0f0f0');
	
mainGroup.append('text')
	.attr('x', '25%')
	.attr('y', '24%')
	.attr('font-family', 'sans-serif')
	.attr('font-size' , '20px')
	.attr('font-weight', '700') 
	.text('Active Robots');
	
mainGroup.append('text')
	.attr('x', '53%')
	.attr('y', '24%')
	.attr('font-family', 'sans-serif')
	.attr('font-size' , '20px')
	.attr('font-weight', '700') 
	.text('Active Users');

mainGroup.append('text')
	.attr('x', '81%')
	.attr('y', '24%')
	.attr('font-family', 'sans-serif')
	.attr('font-size' , '20px')
	.attr('font-weight', '700') 
	.text('Chat Box');

var gearImage = menuGroup
	.append('image')
	.attr('href', 'gear.png')
	.attr('alt', 'gear')
	.attr('height', '10%')
	.attr('width', '10%')
	.attr('x', '2.5%')
	.attr('y', '1.5%');	
	
mainGroup.append('text')
	.attr('x', '4.5%')
	.attr('y', '17%')
	.attr('font-family', 'sans-serif')
	.attr('font-size' , '24px')
	.attr('font-weight', '700') 
	.attr('fill', 'white')
	.style('text-decoration', 'underline')
	.text('Lobby');
	
socket.on('robotInfo', function(data){
	var y = 20;
	var y2 = 22;
	var y3 = 24
	
	robotTextGroup.selectAll('text').remove();
	
	robotTextGroup.selectAll('text')
		.data(data)
		.enter()
		.append('text')
			.attr('x', '16.5%')
			.attr('y', function(d){
				y+=8; 
				console.log(d['name']);
				return y+"%";})
			.attr('font-family', 'sans-serif')
			.text(function(d) { return d['name'];});
			
	driverTextGroup.selectAll('text').remove();
			
	driverTextGroup.selectAll('text')
		.data(data)
		.enter()
		.append('text')
			.attr('x', '16.5%')
			.attr('y', function(){
				y2+=8;
				return y2 + "%";})
			.attr('font-family', 'sans-serif')
			.attr('font-size', '10px')
			.text(function(d) {return "Driver: " + d['driver'];});
		
	gunnerTextGroup.selectAll('text').remove();		
	gunnerTextGroup.selectAll('text')
		.data(data)
		.enter()
		.append('text')
			.attr('x', '16.5%')
			.attr('y', function(){
				y3+=8;
				return y3 + "%";})
			.attr('font-family', 'sans-serif')
			.attr('font-size', '10px')
			.text(function(d) {return "Gunner: " + d['gunner'];});
});
	
	
socket.on('usernames', function(data) {
	var y = 26;

	userTextGroup.selectAll('text').remove();
	
	userTextGroup.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr('x', '44.5%')
		.attr('y', function(d){
			y = y+=2; 
			return y+"%";})
		.attr('font-family', 'sans-serif')
		.text(function(d) { return d;});
});

/*socket.on('dblist', function(data) {
	var y = 26;

	dbTextGroup.selectAll('text').remove();
	
	dbTextGroup.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr('x', '72.5%')
		.attr('y', function(d){
			y = y+=2; 
			return y+"%";})
		.attr('font-family', 'sans-serif')
		.text(function(d) { return d;});
});*/


//Chat Box
$(function () {
	$('#msgform').submit(function(){
	  socket.emit('chat message', $('#m').val());
	  $('#m').val('');
	  return false;
	});
	socket.on('chat message', function(msg){
	  $('#messages').append($('<li><strong>' + msg.username + ":</strong> " + msg.message + '</li>'));
	  var chatDiv = document.getElementById("chat-box");
	  chatDiv.scrollTop = chatDiv.scrollHeight;
	});
});











//Display connected users
socket.on('usernames', function(data) {

	var html = '';
	for (i = 0; i < data.length; i++) {
		html += data[i] + '<br/>';
	}
	document.getElementById("users").innerHTML = html;
});

//Display connected users
socket.on('robotNames', function(data) {

	var html = '';
	for (i = 0; i < data.length; i++) {
		html += data[i] + '<br/>';
	}
	document.getElementById("robots").innerHTML = html;
});