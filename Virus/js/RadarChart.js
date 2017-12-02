var Radar_margin = {top: 50, right: 410, bottom: 10, left: 350},
	Radar_width = 250 * 3,
	Radar_height = 270 * 3,
	radius = Math.min(Radar_width/2, Radar_height/2);
	total_angle = Math.PI * 2 / 5 * 3;

var Radar_color = d3.scale.ordinal()
	.range(["#00C5CD","80c269"]);
// var Dot_color = ["","#00C5CD", "#f6ce63", "f1a6a6", "80c269"];
var Dot_color = ["","#eb6e6e", "#30ffe8", "ffd930", "8b7cf1"];
var Diease_name = ["","H1N1","ZIKA","SARS","EBOLA"];

RadarCharRun();

function RadarCharRun()
{
	var levels = 12 * 3;
	var axis_name = (Radardata.map(function(i, j){return i.year})),
		axis_len = axis_name.length,
		avg_angle = total_angle / 18,
		angle_diff = Math.PI +  (total_angle - Math.PI)/2;
	var maxValue = new Array();
	for (i = 0; i < axis_len; i++) maxValue[i] = 1;
	// d3.max(Radardata, function(i){return d3.max(i.map(function(o, j){ maxValue[j] = Math.max(maxValue[j], o.value);return o.value;}))});

	var rScale = new Array();
	var maxRange = radius/10;
	rScale[1] = d3.scale.linear().range([0, maxRange]).domain([0, 180821]);
	rScale[2] = d3.scale.linear().range([0, maxRange]).domain([0, 21196]);
	rScale[3] = d3.scale.linear().range([0, maxRange]).domain([0, 4041]);
	rScale[4] = d3.scale.linear().range([0, maxRange]).domain([0, 4270]);

	var month_ratio =d3.scale.linear()
			.range([radius/3*2, radius])
			.domain([0, 12]);

	var svg = d3.select("body").append("svg")
			.attr("id", "Radar_svg")
			.style("float", "left")
			.attr("width",  Radar_width + Radar_margin.left + Radar_margin.right)
			.attr("height", Radar_height + Radar_margin.top + Radar_margin.bottom)
			.attr("class", "radarRadar_svg");

	var g = svg.append("g")
			.attr("transform", "translate(" + (Radar_width/2 + Radar_margin.left) + "," + (Radar_height/2 + Radar_margin.top) + ")")
			.style("z-index",1);
	g.append("image")
		.attr("href","image/map.png")
		.style("height",Radar_height/5*3)
		.style("width",Radar_width/5*3)
		.style("x",-Radar_width/5*3/2)
		.style("y",-Radar_height/20*9)
		.style("z-index",-1);
	g.append("image")
		.attr("id", "words_inside")
		.attr("href","image/words_inside.png")
		.style("height",Radar_height/20*3)
		.style("width",Radar_width/20*3)
		.style("x",-Radar_width/20*3/2)
		.style("y",-Radar_height/20*3/2)
		.style("z-index",-1);
	g.append("image")
		.attr("id", "words_outside")
		.attr("href","image/words_outside.png")
		.style("height",Radar_height/20*3)
		.style("width",Radar_width/20*3)
		.style("x",-Radar_width/20*3/2)
		.style("y",-Radar_height/20*3/2)
		.style("z-index",-1);
	g.append("image")
		.attr("href","image/axis.png")
		.style("height",Radar_height/20)
		.style("width",Radar_width/50*31)
		.style("x",-Radar_width/3.24)
		.style("y",Radar_height/7.1)
		.style("z-index",-1);
	g.append("image")
		.attr("id", "white_small")
		.attr("href","image/white_small.png")
		.style("height",Radar_height/20*3)
		.style("width",Radar_width/20*3)
		.style("x",-Radar_width/20*3/2)
		.style("y",-Radar_height/20*3/2)
		.style("opacity", 0)
		.style("z-index",-1);
	g.append("image")
		.attr("id", "white_big")
		.attr("href","image/white_big.png")
		.style("height",Radar_height/20*3)
		.style("width",Radar_width/20*3)
		.style("x",-Radar_width/20*3/2)
		.style("y",-Radar_height/20*3/2)
		.style("opacity", 0)
		.style("z-index",-1);
	g.append("image")
		.attr("href","image/pointer.png")
		.style("height",Radar_height/20*3)
		.style("width",Radar_width/20*3)
		.style("x",-Radar_width/20*3/2)
		.style("y",-Radar_height/20*3/2)
		.style("z-index",-1);
	g.append("image")
		.attr("id", "center_img")
		.attr("href","image/overview.png")
		.style("height",Radar_height/20*3)
		.style("width",Radar_width/20*3)
		.style("x",-Radar_width/20*3/2)
		.style("y",-Radar_height/20*3/2)
		.style("z-index",-1);
	g.append("image")
		.attr("id", "symptom_img")
		.attr("href","image/symptoms.jpeg")
		.style("height",Radar_height)
		.style("x",Radar_width*0.6)
		.style("y",-Radar_height*0.5)
		.style("z-index",-1)
		.style("opacity", 0);

	var axisGrid = g.append("g").attr("class", "axisWrapper")
					.attr("id", "Radar_axis");
	//circle
	axisGrid.selectAll(".levels")
		.data(d3.range(1,(levels+1)).reverse())
	.enter()
		.append("path")
		.attr("d", function(d){return describeArc(0, 0, radius/levels*d, -angle_diff/Math.PI*180+90, (-angle_diff + total_angle)/Math.PI*180+90)})
		.style("fill-opacity", 0)
		.style("stroke", "#CDCDCD")
		.style("stroke-width", function(d){ if (d>levels/3*2) return "0.5px"; else return "0px";} );

	//lines
	var axis = axisGrid.selectAll(".axis")
		.data(Radardata)
	.enter()
		.append("g")
		.attr("class", "axis");

	axis.append("line")
		.attr("x1", function(d, i){ return radius*(2/3+1/36) * Math.cos(avg_angle*i - angle_diff); })
		.attr("y1", function(d, i){ return radius*(2/3+1/36) * Math.sin(avg_angle*i - angle_diff); })
		.attr("x2", function(d, i){ return radius * Math.cos(avg_angle*i - angle_diff); })
		.attr("y2", function(d, i){ return radius * Math.sin(avg_angle*i - angle_diff); })
		.attr("class", "line")
		.style("stroke", "#CDCDCD")
		.style("stroke-width", "1px");
	//labels
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", function(d, i){ if (d.year!="2018") return"12px"; return "0px";})
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return radius * 1.05 * Math.cos(avg_angle*i - angle_diff + avg_angle/2); })
		.attr("y", function(d, i){ return radius * 1.05 * Math.sin(avg_angle*i - angle_diff + avg_angle/2); })
		.text(function(d){ return d.year;});

	//radial line
	var rLine = new Array();
	rLine[1] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 622482]);	//H1N1
	rLine[2] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 8437]);	//SARS
	rLine[3] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 581685]);	//ZIKA
	rLine[4] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 15249]);

	var clip_arc = d3.svg.arc()
		.innerRadius(radius*(2/3+1/36))
		.outerRadius(radius * 2)
		.startAngle(0)
		.endAngle(2 * Math.PI)();

	g.append("clipPath")
		.attr("id", "Line_clip")
		.append("path")
		.attr("d", clip_arc);

	drawRadialLine(H1N1_Line_data, 'H1N1', rLine[1], g, total_angle / 12, angle_diff);	//H1N1
	drawRadialLine(SARS_Line_data, 'SARS', rLine[2], g, total_angle / 12, angle_diff);	//SARS
	drawRadialLine(ZIKA_Line_data, 'ZIKA', rLine[3], g, total_angle / 12, angle_diff);	//ZIKA
	drawRadialLine(EBOLA_Line_data, 'EBOLA', rLine[4], g, total_angle / 12, angle_diff);	//EBOLA

	
	drawDots(g, H1N1_data, month_ratio, rScale, 1);
	drawDots(g, Zika_data, month_ratio, rScale, 2);
	drawDots(g, SARS_data, month_ratio, rScale, 3);
	drawDots(g, EBOLA_data, month_ratio, rScale, 4);

	maxRange = radius/10;
	rScale[1] = d3.scale.linear().range([0, maxRange]).domain([0, 33902]);
	rScale[2] = d3.scale.linear().range([0, maxRange]).domain([0, 109596]);
	rScale[3] = d3.scale.linear().range([0, maxRange]).domain([0, 5327]);
	rScale[4] = d3.scale.linear().range([0, maxRange]).domain([0, 10666]);

	MapDot(g, rScale, 1);
	MapDot(g, rScale, 2);
	MapDot(g, rScale, 3);
	MapDot(g, rScale, 4);


	// transparent circle for listening mouse drag
	g.append("circle")
		.style("r",Radar_width/20*3/2)
		.style("cx",0)
		.style("cy",0)
		.style("opacity", 0.0)
		.style("fill", "red")
		.style("cursor", "pointer")
		.style("z-index",2)
		.call(PlateBig_drag);

	g.append("circle")
		.style("r",Radar_width/20*3/2/3*2)
		.style("cx",0)
		.style("cy",0)
		.style("opacity", 0.0)
		.style("fill", "blue")
		.style("cursor", "pointer")
		.style("z-index",2)
		.call(PlateSmall_drag);
}

function drawRadialLine(Data, name, rLine, g, avg_angle, angle_diff){
	var radarLine = d3.svg.line.radial()
		.interpolate("linear")
		.radius(function(d, i) { return i==0 ? 0 :rLine(d.value); })
		.angle(function(d, i) { return i==0 ? 0 : (d.month-1)*avg_angle - angle_diff + avg_angle/31*d.day + Math.PI/2; });
	
	var blobWrapper = g.selectAll(".radialLine_"+name)
		.data(Data)
		.enter().append("g")
		.attr("class", "radialLine_"+name);

	blobWrapper.append("path")
		.attr("id", "radarArea")
		.attr("class", "radarArea_"+name)
		.attr("clip-path", "url(#Line_clip)")
		.attr("d", function(d, i) { return radarLine(d); })
		.style("fill", function(d, i) { return Dot_color[d[i].index]; })
		.style("fill-opacity", 0.0)	
		.style("stroke-width", 0.0 + "px")
		.style("stroke", function(d, i) { return Dot_color[d[i].index]; })
		.on('mouseover', function(d, i){
			if (d3.select(this).style("fill-opacity") > 0){
				d3.select(this)
					.transition().duration(300)
					.style("fill-opacity", 0.7);	
			}
		})
		.on('mouseout', function(d,i){
			if (d3.select(this).style("fill-opacity") > 0){
				d3.select(this)
					.transition().duration(300)
					.style("fill-opacity", 0.35);
			}
		});

}



function drawDots(g, Data, month_ratio, rScale, k){

	var blobWrapper = g.append("g")
		.attr("id", "radarWrapper");

	//tooltip
	var tooltip = g.append("rect")
		.attr("class", "Radar_tooltip")
		.attr("width", 120)
		.attr("height", 23)
		.style("opacity", 0);
	var tooltext = g.append("text")
		.attr("class", "Radar_tooltext")
		.style("opacity", 0);

	var avg_angle = total_angle / 18,
		angle_diff = Math.PI +  (total_angle - Math.PI)/2;
	//dots
	blobWrapper.selectAll(".radarCircle")
		.data(Data)
	.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", function(d){ return rScale[k](d.value);})
		.attr("cx", function(d, i){ return month_ratio(d.month) * Math.cos(avg_angle*(d.year-2000) - angle_diff + avg_angle/2); })
		.attr("cy", function(d, i){ return month_ratio(d.month) * Math.sin(avg_angle*(d.year-2000) - angle_diff + avg_angle/2); })
		.attr("k", k)
		.style("fill", Dot_color[k])
		.style("fill-opacity", 0.8)
		.on("mouseover", function(d,i) {
			if (d3.select(this).style("fill-opacity") > 0)
			{
				d3.select(this).style("fill-opacity", 1.0)
				.style("cursor", "pointer");
				newX =  parseFloat(d3.select(this).attr('cx')) + 10;
				newY =  parseFloat(d3.select(this).attr('cy')) + 12;		
				tooltext.attr('x', newX)
					.attr('y', newY)
					.transition().duration(200)
					.text(Diease_name[k]+"\n"+d.year+"\n"+d.month+"\n"+d.value+"\n")
					.style('opacity', 1.0);
				tooltip.attr('x', newX-8)
					.attr('y', newY-15)
					.transition().duration(200)
					.style('opacity', 1.0)
					.style('fill', d3.select(this).style("fill"));
			}
		})
		.on("mouseout", function(){
			if (d3.select(this).style("fill-opacity") >0)
			{
				d3.select(this).style("fill-opacity", 0.8)
				.style("cursor", "default");
				tooltip.transition().duration(200)
					.style("opacity", 0);
				tooltext.transition().duration(200)
					.style("opacity", 0);
			}
		})
		.on("click", function(d){
			drawTip(k, d.year, d.month);
		})
		;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}