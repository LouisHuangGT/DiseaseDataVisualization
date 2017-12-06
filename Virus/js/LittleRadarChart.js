var SmallRadial = d3.svg.line.radial()
			.interpolate("linear");

LittleRadarChart(Math.min(Radar_width/4.5, Radar_height/4.5), 0.91, 0.2, 1);
LittleRadarChart(Math.min(Radar_width/9, Radar_height/9), 0.81, 0.6, 2);
LittleRadarChart(Math.min(Radar_width/9, Radar_height/9), 0.95, 0.6, 3);
LittleRadarChart(Math.min(Radar_width/9, Radar_height/9), 0.81, 0.88, 4);
LittleRadarChart(Math.min(Radar_width/9, Radar_height/9), 0.95, 0.88, 5);

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
	rLine[1] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 33902]);	//H1N1
	rLine[2] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 5328]);	//SARS
	rLine[3] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 231725]);	//ZIKA
	rLine[4] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 8704]);	//EBOLA

	var clip_arc = d3.svg.arc()
		.innerRadius(radius*(2/3+1/36))
		.outerRadius(radius * 2)
		.startAngle(0)
		.endAngle(2 * Math.PI)();

	g.append("clipPath")
		.attr("id", "Little_Line_clip_"+num)
		.append("path")
		.attr("d", clip_arc);


	var ContinentName = ["Whole_world","Africa","Europe","Asia","Australia","South_America","North_America"];
	for (var i = 0; i < 7; i++){
		drawLittleRadialLine(ContinentName[i], 'H1N1', rLine[1], g, total_angle / 12, angle_diff, num, 0);	//H1N1
		drawLittleRadialLine(ContinentName[i], 'H1N1', rLine[1], g, total_angle / 12, angle_diff, num, 1);	//H1N1
		drawLittleRadialLine(ContinentName[i], 'SARS', rLine[2], g, total_angle / 12, angle_diff, num, 7);	//SARS
		drawLittleRadialLine(ContinentName[i], 'SARS', rLine[2], g, total_angle / 12, angle_diff, num, 6);	//SARS
		drawLittleRadialLine(ContinentName[i], 'ZIKA', rLine[3], g, total_angle / 12, angle_diff, num, 4);	//ZIKA
		drawLittleRadialLine(ContinentName[i], 'ZIKA', rLine[3], g, total_angle / 12, angle_diff, num, 5);	//ZIKA
		drawLittleRadialLine(ContinentName[i], 'ZIKA', rLine[3], g, total_angle / 12, angle_diff, num, 3);	//ZIKA
		drawLittleRadialLine(ContinentName[i], 'EBOLA', rLine[4], g, total_angle / 12, angle_diff, num, 9);	//EBOLA
		drawLittleRadialLine(ContinentName[i], 'EBOLA', rLine[4], g, total_angle / 12, angle_diff, num, 10);	//EBOLA
		drawLittleRadialLine(ContinentName[i], 'EBOLA', rLine[4], g, total_angle / 12, angle_diff, num, 11);	//EBOLA
	}


}

function drawLittleRadialLine(continent, name, rLine, g, avg_angle, angle_diff, num, k){
	//tooltip
	var tooltip = g.append("rect")
		.attr("class", "Radar_tooltip")
		.attr("width", 175)
		.attr("height", 35)
		.style("opacity", 0)
		.style('z-index', 5);
	var tooltext = g.append("text")
		.attr("class", "Radar_tooltext")
		.style("opacity", 0)
		.attr('x', 999)
		.style('z-index', 5);
	var tooltext2 = g.append("text")
		.attr("class", "Radar_tooltext")
		.style("opacity", 0)
		.attr('x', 999)
		.style('z-index', 5);

	var Line_color = ["#ffffff","#ffe35e","#867313", "#ffffff","#a497ff", "#5e4dd8", "#ffffff","#f16565", "#ba0100", "#ffffff","#30ffe8", "#147469","#ffffff"];
	var Line_opacity = [0.34, 0.34, 0.34];
	var ts = 10;
	var Text_size = [0, ts*2, ts, ts, ts, ts];
	var Text_left = [0, -3,-2,-2,-2,-2]
	d3.csv("data/Top5/"+name+"/"+continent+"/"+"Top"+num+".csv", function(error, data) {
		if (error) {return;}

		if (continent == 'Whole_world') continent = 'overview';
		if (continent == 'South_America') continent = 'South America';
		if (continent == 'North_America') continent = 'North America';

		//find min and max
		var dmin = 999999;
		var dmax = 0;
		var minYear = 2018;
		var minMonth = [12, 12, 12];
		var maxMonth = [1, 1, 1];
		var country = '';
		data.forEach(function(d) {
			var value = 0;
			if (k%3==0) value = parseInt(d.cal_case);
			if (k%3==1) value = parseInt(d.cal_death);
			if (k%3==2) value = parseInt(d.suspect);
			var d1 = dmin;
			var d2 = dmax;
			if (value > dmax) dmax = value;
			if (value < dmin) dmin = value;
			if (d.year<minYear) minYear = d.year;
			country = d.country;
			});

		// data.forEach(function(d) {
		// 	var i = d.year-minYear;
		// 	if (i<=1){
		// 		if (d.month > maxMonth[i]) maxMonth[i] = d.month;
		// 		if (d.month < minMonth[i]) minMonth[i] = d.month;
		// 	}
		// });
		
		var count = 0;
		SmallRadial.radius(function(d) { 
				count = count + 1;
				if (count == 1) return 0;
				if (k%3==0) return rLine(d.cal_case);
				else if (k%3==1) return rLine(d.cal_death);
				else return rLine(d.suspect);
			 })
			.angle(function(d) { return (d.month-1)*avg_angle - angle_diff + avg_angle/31*d.day + Math.PI/2; });
		
		var bb = g.append("g")
			.data(data)
			.attr("class", "radialLine_"+name);

		var blobWrapper = g.select(".radialLine_"+name);
		var coun = country;
		if (coun == "United States of America") coun = "USA";
		g.append('text')
			.text(coun)
			.attr("id", "radarArea")
			.attr('x', coun.length*Text_left[num])
			.attr("class", "Little_radarText_"+name)
			.style('font-size', Text_size[num])
			.attr("year", minYear)
			.attr("continent", continent)
			.style('fill', 'white')
			.style('fill-opacity', 0.0);

		blobWrapper.append("path")
			.attr("id", "radarArea")
			.attr("class", "Little_radarArea_"+name)
			.attr("clip-path", "url(#Little_Line_clip_"+num+")")
			.attr("d", function(d) { return SmallRadial(data); })
			.attr("year", function(d) { return d.year; })
			.attr("continent", continent)
			.attr("name", name+num)
			.attr("opa", function(d) { return Line_opacity[k%3]; })
			.style("fill", function(d) { return Line_color[1+k]; })
			.style("fill-opacity", 0.0)	
			.style("stroke-width", 0.0 + "px")
			.style("stroke", function(d) { return Line_color[1+k]; })
			.on('mouseover', function(d){
				// if (d3.select(this).style("fill-opacity") > 0){
					d3.select(this)
						.transition().duration(300)
						.style("fill-opacity", 1.0);	


					var textType = ['', 'Infected Cases: ', 'Death Cases: ', 'Suspected Cases: '];
					var newX = d3.mouse(this)[0] + 10;
					var newY = d3.mouse(this)[1] + 30;	
					var year = d3.select(this).attr("year");
					tooltext.attr('x', newX)
						.attr('y', newY)
						.transition().duration(200)
						// .text(name+", "+Month_index[minMonth[year-minYear]]+" ~ "+Month_index[maxMonth[year-minYear]]+", "+year)
						.text(name)
						.style('text-align', 'left')
						.style('opacity', 0.8);
					tooltext2.attr('x', newX)
						.attr('y', newY+12)
						.transition().duration(200)
						.text(
							textType[(k%3)+1]+dmin+" ~ "+dmax
						)
						.style('text-align', 'left')
						.style('opacity', 0.8);
					tooltip.attr('x', newX-8)
						.attr('y', newY-15)
						.transition().duration(200)
						.style('opacity', 0.5)
						.style('fill', d3.select(this).style("fill"));
				// }
			})
			.on('mouseout', function(d,i){
				// if (d3.select(this).style("fill-opacity") > 0){
					d3.select(this)
						.transition().duration(300)
						.style("fill-opacity", d3.select(this).attr('opa'));

					tooltip.transition().duration(200)
					.style("opacity", 0);
					tooltext.transition().duration(200)
						.style("opacity", 0);
					tooltext2.transition().duration(200)
						.style("opacity", 0);
					tooltip.attr('x', 9999);
					tooltext.attr('x', 9999);
					tooltext2.attr('x', 9999);
				// }
			});

	});
}