var socket= connectToUserSocket();

//Redirect user as instructed by server
socket.on('redirect', function(destination) {
	window.location.href = destination;
});

var bodySelect = d3.select("body").select("div");
var svgSelect = bodySelect.append("svg")	//Creates SVG element in body of HTML
				.attr("preserveAspectRatio", "xMinYMin meet")
				.attr("viewBox", "0 0 1200 800")
				.classed("svg-content-responsive", true); 

				
var logoGroup = svgSelect.append('g');
var menuGroup = svgSelect.append('g');
var bannerGroup =  svgSelect.append('g');
var mainGroup = svgSelect.append('g');
var userTextGroup = mainGroup.append('g');

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
	

socket.on('usernames', function(data) {
	var y = 23;
	var newData = [];
	for(var i=0; i<data.length; i++){
		newData.push(
		{
			pos : y + "%",
			name : data[i]
		});
		y+=2;
	}
	
	userTextGroup.selectAll('text').remove();
	
	userTextGroup.selectAll('text')
		.data(newData)
		.enter()
		.append('text')
		.attr('x', '44%')
		.attr('y', data['pos'])
		.text(data['name']);

});
	