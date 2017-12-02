var LT_margin = {top: 100, right: 110, bottom: 30, left: 50},
	LT_width = 250,
	LT_height = 270 * 3;

var LT_svg = d3.select("#Radar_svg");

var LT_g = LT_svg.append("g")
		.attr("width", LT_width+LT_margin.left+LT_margin.right)
		.attr("height", LT_height+LT_margin.top+LT_margin.bottom);

//head
var LT_head1 = LT_g.append("text")
		.attr("class", "LT_head")
		.attr('x', LT_margin.left)
		.attr('y', LT_margin.top)
		.text('Epidemic Breakouts')
		.style("opacity", 0.9)
		.style("fill","white")
		.style("font-size", '30px');
var LT_head2 = LT_g.append("text")
		.attr("class", "LT_head")
		.attr('x', LT_margin.left)
		.attr('y', LT_margin.top*1.35)
		.text('in 21st Century')
		.style("opacity", 0.9)
		.style("fill","white")
		.style("font-size", '30px');

//tooltip
var LT_tooltip = LT_g.append("rect")
	.attr("class", "LT_tooltip")
	.attr("width", 200)
	.attr("height", 300)
	.attr('x', LT_margin.left)
	.attr('y', LT_height/3);

var LT_tooltext = LT_g.append("text")
		.attr("class", "LT_tooltext")
		.attr('x', LT_margin.left)
		.attr('y', LT_height/3+LT_margin.top);

function drawTip(k, year, month){
	
	d3.select(".LT_tooltip")
		.style('fill', Dot_color[k])
		.style('fill-opacity', 0.3)
		.style('stroke-width', '1.0px')
		.style('stroke', Dot_color[k]);

	
	d3.select(".LT_tooltext")
		.text(Diease_name[k]+"\n"+year+"\n"+month)
		.style("opacity", 0.7)
		.style("fill","white");

}