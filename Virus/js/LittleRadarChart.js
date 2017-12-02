LittleRadarChart(Math.min(Radar_width/4.5, Radar_height/4.5), 0.91, 0.2, 1);
LittleRadarChart(Math.min(Radar_width/9, Radar_height/9), 0.81, 0.6, 2);
LittleRadarChart(Math.min(Radar_width/9, Radar_height/9), 0.95, 0.6, 3);
LittleRadarChart(Math.min(Radar_width/9, Radar_height/9), 0.81, 0.88, 4);
LittleRadarChart(Math.min(Radar_width/9, Radar_height/9), 0.95, 0.88), 5;

function LittleRadarChart(radius, height_ratio, width_ratio, num)
{
	var levels = 12 * 3;
	var axis_name = (Radardata.map(function(i, j){return i.year})),
		axis_len = axis_name.length,
		avg_angle = total_angle / 12,
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

	var svg = d3.select("#Radar_svg");

	var g = svg.append("g")
			.attr("id", "Little_Radar")
			.attr("transform", "translate(" + (Radar_width*width_ratio + Radar_margin.left) + "," + (Radar_height*height_ratio + Radar_margin.top) + ")")
			.style("z-index",1)
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

	// axis.append("line")
	// 	.attr("x1", function(d, i){ return radius*(2/3+1/36) * Math.cos(avg_angle*(d.year-2000) - angle_diff); })
	// 	.attr("y1", function(d, i){ return radius*(2/3+1/36) * Math.sin(avg_angle*(d.year-2000) - angle_diff); })
	// 	.attr("x2", function(d, i){ return radius * Math.cos(avg_angle*(d.year-2000) - angle_diff); })
	// 	.attr("y2", function(d, i){ return radius * Math.sin(avg_angle*(d.year-2000) - angle_diff); })
	// 	.attr("class", "line")
	// 	.style("stroke", "#CDCDCD")
	// 	.style("stroke-width", "1px")
	// 	.style("stroke-width", function(d) { if (d.year>=2000 && d.year<=2012) return "1px"; return "0px"});

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
		.attr("id", "Little_Line_clip_"+num)
		.append("path")
		.attr("d", clip_arc);

	drawLittleRadialLine(H1N1_Line_data, 'H1N1', rLine[1], g, total_angle / 12, angle_diff, num);	//H1N1
	drawLittleRadialLine(SARS_Line_data, 'SARS', rLine[2], g, total_angle / 12, angle_diff, num);	//SARS
	drawLittleRadialLine(ZIKA_Line_data, 'ZIKA', rLine[3], g, total_angle / 12, angle_diff, num);	//ZIKA
	drawLittleRadialLine(EBOLA_Line_data, 'EBOLA', rLine[4], g, total_angle / 12, angle_diff, num);	//EBOLA

}

function drawLittleRadialLine(Data, name, rLine, g, avg_angle, angle_diff, num){
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
		.attr("class", "Little_radarArea_"+name)
		.attr("clip-path", "url(#Little_Line_clip_"+num+")")
		.attr("d", function(d, i) { return radarLine(d); })
		.style("fill", function(d, i) { return Dot_color[d[i].index]; })
		.style("fill-opacity", 0)	
		.style("stroke-width", 1.5 + "px")
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
					.style("fill-opacity", 0);
			}
		});

}