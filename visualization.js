
(function(){
	var margin = {top:50,left:50,right:50,bottom:50},
	height= 400 - margin.top - margin.bottom,
	width = 800 - margin.left - margin.right;
var svg = d3.select("#map")
		  .append("svg")
		  .attr("height", height + margin.top + margin.bottom)
		  .attr("width", width + margin.left + margin.right)
		  .append("g")
		  .attr("transform","translate("+margin.left+","+margin.top+")");


var world = d3.json("https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json");
world.then(ready).catch(err);

var projection = d3.geoMercator().translate([width/2,height/2]).scale(100);


var path = d3.geoPath().projection(projection);

function ready(data){
	console.log(data);
	var countries = topojson.feature(data,data.objects.countries1).features;
	console.log(countries);

	svg.selectAll(".country")
	   .data(countries)
	   .enter().append("path")
	   .attr("class","country")
	   .attr("d",path)
	   .on('mouseover',function(d){
	   	d3.select(this).classed("selected",true);
	   })
	   .on('mouseout',function(d){
	   	d3.select(this).classed("selected",false);
	   })

}
function err(error){console.log(error)}

})();