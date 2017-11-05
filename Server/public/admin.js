var socket= connectToUserSocket();

socket.on('redirect', function(destination) {
	window.location.href = destination;
});

var bodySelect = d3.select("body").select("div");
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
	.text('User Database');	
	
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

socket.on('dblist', function(data) {
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
});
