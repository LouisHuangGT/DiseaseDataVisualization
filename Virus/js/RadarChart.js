var Radar_margin = {top: 50, right: 410, bottom: 10, left: 550},
	Radar_width = 250 * 3,
	Radar_height = 270 * 3,
	radius = Math.min(Radar_width/2, Radar_height/2);
	total_angle = Math.PI * 2 / 5 * 3;
// ZIKA, EBOLA, H1N1, SARS
var rTextMax = [0, 581685, 15249, 622482, 8437];


var Radar_color = d3.scale.ordinal()
	.range(["#00C5CD","80c269"]);
// var Dot_color = ["","#00C5CD", "#f6ce63", "f1a6a6", "80c269"];
var Dot_color = ["","#ffd930", "#8b7cf1", "eb6e6e", "30ffe8"];
var Diease_name = ["","H1N1","ZIKA","SARS","EBOLA"];
var G_color = "#ffd930";

var rLineMax = new Array();
var BigRadial = d3.svg.line.radial()
		.interpolate("linear");
var BigRadial_continent = d3.svg.line.radial()
			.interpolate("linear");
var dataContinent = new Array();
var imageY = 0;

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
			.attr("width",  1410)
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
	var imageScale = 1.2;
	var imageTran = imageScale-1;
	g.append("circle")
		.style("r",Radar_width/20*3/2 * imageScale)
		.style("cx",0)
		.style("cy",0 +imageY)
		.style("opacity", 1.0)
		.style("fill", "black")
		.style("cursor", "pointer")
		.style("z-index",2);
	g.append("image")
		.attr("id", "words_inside")
		.attr("href","image/words_inside.png")
		.style("height",Radar_height/20*3 * imageScale)
		.style("width",Radar_width/20*3 * imageScale)
		.style("x",-Radar_width/20*3/2 - Radar_width/20*3 * imageTran/2)
		.style("y",-Radar_height/20*3/2 - Radar_height/20*3 * imageTran/2 +imageY)
		.style("z-index",-1);
	g.append("image")
		.attr("id", "words_outside")
		.attr("href","image/words_outside.png")
		.style("height",Radar_height/20*3 * imageScale)
		.style("width",Radar_width/20*3 * imageScale)
		.style("x",-Radar_width/20*3/2 - Radar_width/20*3 * imageTran/2)
		.style("y",-Radar_height/20*3/2 - Radar_height/20*3 * imageTran/2 +imageY)
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
		.style("height",Radar_height/20*3 * imageScale)
		.style("width",Radar_width/20*3 * imageScale)
		.style("x",-Radar_width/20*3/2 - Radar_width/20*3 * imageTran/2)
		.style("y",-Radar_height/20*3/2 - Radar_height/20*3 * imageTran/2 +imageY)
		.style("opacity", 0)
		.style("z-index",-1);
	g.append("image")
		.attr("id", "white_big")
		.attr("href","image/white_big.png")
		.style("height",Radar_height/20*3 * imageScale)
		.style("width",Radar_width/20*3 * imageScale)
		.style("x",-Radar_width/20*3/2 - Radar_width/20*3 * imageTran/2)
		.style("y",-Radar_height/20*3/2 - Radar_height/20*3 * imageTran/2 +imageY)
		.style("opacity", 0)
		.style("z-index",-1);
	g.append("image")
		.attr("href","image/pointer.png")
		.style("height",Radar_height/20*3 * imageScale)
		.style("width",Radar_width/20*3 * imageScale)
		.style("x",-Radar_width/20*3/2 - Radar_width/20*3 * imageTran/2)
		.style("y",-Radar_height/20*3/2 - Radar_height/20*3 * imageTran/2 +imageY)
		.style("z-index",-1);
	g.append("image")
		.attr("id", "center_img")
		.attr("href","image/overview.png")
		.style("height",Radar_height/20*3 * imageScale)
		.style("width",Radar_width/20*3 * imageScale)
		.style("x",-Radar_width/20*3/2 - Radar_width/20*3 * imageTran/2)
		.style("y",-Radar_height/20*3/2 - Radar_height/20*3 * imageTran/2 +imageY)
		.style("z-index",-1);
	// g.append("image")
	// 	.attr("id", "symptom_img")
	// 	.attr("href","image/symptoms.jpeg")
	// 	.style("height",Radar_height)
	// 	.style("x",Radar_width*0.6)
	// 	.style("y",-Radar_height*0.5)
	// 	.style("z-index",-1)
	// 	.style("opacity", 0); 
	// g.append("image")
	// 	.attr("id", "tip1")
	// 	.attr("href","image/tip1.jpg")
	// 	.style("height",Radar_height/4.5)
	// 	.style("width",Radar_width/4.5)
	// 	.style("x",Radar_width*0.073)
	// 	.style("y",-Radar_height/12)
	// 	.style("z-index",-1);
	g.append("image")
		.attr("id", "tip1")
		.attr("href","image/note_plate.png")
		.style("height",Radar_height/4.5)
		.style("width",Radar_width/4.5)
		.style("x",Radar_width*0.073-137)
		.style("y",-Radar_height/12+70)
		.style("z-index",-1);

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
		.attr("id", "text_legend")
		.attr("class", "legend")
		.style("font-size", function(d, i){ if (d.year!="2018") return"12px"; return "0px";})
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return radius * 1.05 * Math.cos(avg_angle*i - angle_diff + avg_angle/2); })
		.attr("y", function(d, i){ return radius * 1.05 * Math.sin(avg_angle*i - angle_diff + avg_angle/2); })
		.text(function(d){ return d.year;});
	axis.append("text")
		.attr("id", "text_legend")
		.attr("class", "legend_month")
		.style("font-size", function(d, i){ if (d.month!=1) return"8px"; return "0px";})
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return -12; })
		.attr("y", function(d, i){ return -radius / 36 * (i + 25.3); })
		.text(function(d){ return d.month;});



	//radial line
	var rLine = new Array();
	rLine[1] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 622482]);	//H1N1
	rLine[2] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 8437]);	//SARS
	rLine[3] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 581685]);	//ZIKA
	rLine[4] = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, 15249]);	//EBOLA
	rLineMax[1] = 622482;
	rLineMax[2] = 8437;
	rLineMax[3] = 581685;
	rLineMax[4] = 15249;

	axis.append("text")
		.attr("id", "legend_left")
		.attr("class", "legend_number")
		.style("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return 0; })
		.attr("y", function(d, i){ return -radius / 36 * (-1 + 25.3); })
		.style("opacity", 0)
		// .attr("x", function(d, i){ return -10+radius*(2/3+1/36) * Math.cos(avg_angle*17 - angle_diff + avg_angle); })
		// .attr("y", function(d, i){ return 10+radius*(2/3+1/36) * Math.sin(avg_angle*17 - angle_diff + avg_angle); })
		.text("0");
	axis.append("text")
		.attr("id", "legend_mid")
		.attr("class", "legend_number")
		.style("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return 0; })
		.attr("y", function(d, i){ return -radius / 36 * (5.7 + 25.3); })
		.style("opacity", 0)
		// .attr("x", function(d, i){ return -10+radius*(2/3+1/36) * Math.cos(avg_angle*17 - angle_diff + avg_angle); })
		// .attr("y", function(d, i){ return 10+radius*(2/3+1/36) * Math.sin(avg_angle*17 - angle_diff + avg_angle); })
		.text("49999");
	axis.append("text")
		.attr("id", "legend_right")
		.attr("class", "legend_number")
		.style("font-size", "12px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return 0; })
		.attr("y", function(d, i){ return -radius / 36 * (11.5 + 25.3); })
		.style("opacity", 0)
		// .attr("x", function(d, i){ return -5+radius * 1.05 * Math.cos(avg_angle*17 - angle_diff + avg_angle); })
		// .attr("y", function(d, i){ return 5+radius * 1.05 * Math.sin(avg_angle*17 - angle_diff + avg_angle); })
		.text("99999");


	

	var clip_arc = d3.svg.arc()
		.innerRadius(radius*(2/3+1/36))
		.outerRadius(radius * 2)
		.startAngle(0)
		.endAngle(2 * Math.PI)();

	g.append("clipPath")
		.attr("id", "Line_clip")
		.append("path")
		.attr("d", clip_arc);

	drawRadialLine(H1N1_Line_data, 'H1N1', rLine[1], g, total_angle / 12, angle_diff, 0, 3);	//H1N1
	drawRadialLine(SARS_Line_data, 'SARS', rLine[2], g, total_angle / 12, angle_diff, 6, 2);	//SARS
	drawRadialLine(ZIKA_Line_data, 'ZIKA', rLine[3], g, total_angle / 12, angle_diff, 3, 6);	//ZIKA
	drawRadialLine(EBOLA_Line_data, 'EBOLA', rLine[4], g, total_angle / 12, angle_diff, 9, 6);	//EBOLA

	var ContinentName = ["Whole_world","Africa","Europe","Asia","Australia","South_America","North_America"];
	for (var i = 1; i < 7; i++){
		drawRadialLine_Continent(ContinentName[i], 'H1N1', rLine[1], g, total_angle / 12, angle_diff, 0);	//H1N1
		drawRadialLine_Continent(ContinentName[i], 'H1N1', rLine[1], g, total_angle / 12, angle_diff, 1);	//H1N1
		drawRadialLine_Continent(ContinentName[i], 'SARS', rLine[2], g, total_angle / 12, angle_diff, 7);	//SARS
		drawRadialLine_Continent(ContinentName[i], 'SARS', rLine[2], g, total_angle / 12, angle_diff, 6);	//SARS
		drawRadialLine_Continent(ContinentName[i], 'ZIKA', rLine[3], g, total_angle / 12, angle_diff, 4);	//ZIKA
		drawRadialLine_Continent(ContinentName[i], 'ZIKA', rLine[3], g, total_angle / 12, angle_diff, 5);	//ZIKA
		drawRadialLine_Continent(ContinentName[i], 'ZIKA', rLine[3], g, total_angle / 12, angle_diff, 3);	//ZIKA
		drawRadialLine_Continent(ContinentName[i], 'EBOLA', rLine[4], g, total_angle / 12, angle_diff, 9);	//EBOLA
		drawRadialLine_Continent(ContinentName[i], 'EBOLA', rLine[4], g, total_angle / 12, angle_diff, 10);	//EBOLA
		drawRadialLine_Continent(ContinentName[i], 'EBOLA', rLine[4], g, total_angle / 12, angle_diff, 11);	//EBOLA
	}

	
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
		.style("r",Radar_width/20*3/2 * imageScale)
		.style("cx",0)
		.style("cy",0 +imageY)
		.style("opacity", 0.0)
		.style("fill", "red")
		.style("cursor", "pointer")
		.style("z-index",2)
		.call(PlateBig_drag);

	g.append("circle")
		.style("r",Radar_width/20*3/2/3*2 * imageScale)
		.style("cx",0)
		.style("cy",0 +imageY)
		.style("opacity", 0.0)
		.style("fill", "blue")
		.style("cursor", "pointer")
		.style("z-index",2)
		.call(PlateSmall_drag);

	g.append("circle")
		.style("r",Radar_width/20*3/2/3*2/5*2.5 * imageScale)
		.style("cx",0)
		.style("cy",0 +imageY)
		.style("opacity", 0.0)
		.style("fill", "blue")
		.style("cursor", "pointer")
		.style("z-index",2)
		.on('click', function(d){
			ShowPage(1);
		}
			);
}

function drawRadialLine(Data, name, rLine, g, avg_angle, angle_diff, k, ii){
	//find min and max
	var dmin = [9999999, 99999999, 9999999, 9999999, 9999999, 9999999];
	var dmax = [0, 0, 0, 0, 0, 0];
	var minMonth = [12, 12, 12, 12, 12, 12];
	var maxMonth = [1, 1, 1, 1, 1, 1];
	for (var i=0; i<ii; i++)
		Data[i].forEach(function(d) {
			if (d.value > dmax[i]) dmax[i] = d.value;
			if (d.value < dmin[i]) dmin[i] = d.value;
			if (d.month > maxMonth[i]) maxMonth[i] = d.month;
			if (d.month < minMonth[i]) minMonth[i] = d.month;
		});

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
	var Line_opacity = [0.65, 0.65, 0.34];
	BigRadial.radius(function(d, i) { return i==0 ? 0 :rLine(d.value); })
		.angle(function(d, i) { return i==0 ? 0 : (d.month-1)*avg_angle - angle_diff + avg_angle/31*d.day + Math.PI/2; });
	
	var blobWrapper = g.selectAll(".radialLine_"+name)
		.data(Data)
		.enter().append("g")
		.attr("class", "radialLine_"+name);

	blobWrapper.append("path")
		.attr("id", "radarArea")
		.attr("class", "radarArea_"+name)
		.attr("clip-path", "url(#Line_clip)")
		.attr("d", function(d, i) { return BigRadial(d); })
		.attr("year", function(d, i) { return d[i].year; })
		.attr("value", function(d, i) { return d[i].value; })
		.attr("index", function(d, i) { return d[i].index; })
		.attr("name", name)
		.attr("opa", function(d, i) { return Line_opacity[d[i].index-1]; })
		.style("fill", function(d, i) { return Line_color[d[i].index+k]; })
		.style("fill-opacity", 0.0)	
		.style("stroke-width", 0.0 + "px")
		.style("stroke", function(d, i) { return Line_color[d[i].index+k]; })
		.on('mouseover', function(d, i){
			if (d3.select(this).style("fill-opacity") > 0){
				d3.select(this)
					.transition().duration(300)
					.style("fill-opacity", 1.0);

				// var newX =  d3.mouse(this)[0] + 10;
				// var newY =  d3.mouse(this)[1] + 12;		
				var textType = ['', 'Infected Cases: ', 'Death Cases: ', 'Suspected Cases: '];
				var newX =  -225;
				var newY =  30;	
				tooltext.attr('x', newX)
					.attr('y', newY)
					.transition().duration(200)
					.text(name+", "+Month_index[minMonth[i]]+" ~ "+Month_index[maxMonth[i]]+", "+d3.select(this).attr("year"))
					.style('text-align', 'left')
					.style('opacity', 0.8);
				tooltext2.attr('x', newX)
					.attr('y', newY+12)
					.transition().duration(200)
					.text(
						textType[d3.select(this).attr("index")]+dmin[i]+" ~ "+dmax[i]
					)
					.style('text-align', 'left')
					.style('opacity', 0.8);
				tooltip.attr('x', newX-8)
					.attr('y', newY-15)
					.transition().duration(200)
					.style('opacity', 0.5)
					.style('fill', d3.select(this).style("fill"));

			}
		})
		.on('mouseout', function(d,i){
			if (d3.select(this).style("fill-opacity") > 0){
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
			}
		})
		;

}



function drawDots(g, Data, month_ratio, rScale, k){

	var blobWrapper = g.append("g")
		.attr("id", "radarWrapper");

	//tooltip
	var tooltip = g.append("rect")
		.attr("class", "Radar_tooltip")
		.attr("width", 120)
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
		.style('z-index', 4)
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
					.text(Diease_name[k]+", "+Month_index[d.month]+" "+d.year)
					.style('text-align', 'left')
					.style('opacity', 0.8);
				tooltext2.attr('x', newX)
					.attr('y', newY+12)
					.transition().duration(200)
					.text('Total infected:'+' '+d.value)
					.style('text-align', 'left')
					.style('opacity', 0.8);
				tooltip.attr('x', newX-8)
					.attr('y', newY-15)
					.transition().duration(200)
					.style('opacity', 0.5)
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
				tooltext2.transition().duration(200)
					.style("opacity", 0);
				tooltip.attr('x', 9999);
				tooltext.attr('x', 9999);
				tooltext2.attr('x', 9999);
			}
		})
		.on("click", function(d){
			drawTip(k, d.year, d.month);
			// if (d3.select(this).style("fill-opacity") >0)
			// {
			// 	d3.select(this).style("fill-opacity", 1.0);
			// }
		})
		;
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


function drawRadialLine_Continent(continent, name, rLine, g, avg_angle, angle_diff, k){
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
	var Text_left = [0, 4,2,2,2,2];
	
	d3.csv("data/Continent/"+name+"/"+continent+"/"+"Continent.csv", function(error, data) {
		if (error) {return;}
		var continent2 = continent;
		if (continent == 'Whole_world') continent2 = 'overview';
		if (continent == 'South_America') continent2 = 'South America';
		if (continent == 'North_America') continent2 = 'North America';

		//find min and max
		var dmin = 999999;
		var dmax = 0;
		var minYear = 2018;
		var minMonth = [12, 12, 12];
		var maxMonth = [1, 1, 1];
		data.forEach(function(d) {
			if (k%3==0) d.value = parseInt(d.cal_case);
			if (k%3==1) d.value = parseInt(d.cal_death);
			if (k%3==2) d.value = parseInt(d.suspect);
			var d1 = dmin;
			var d2 = dmax;
			if (d.value > dmax) dmax = d.value;
			if (d.value < dmin) dmin = d.value;
			// if (d.year<minYear) minYear = d.year;
			});
		dataContinent[name+continent+(k%3)] = data;
		// data.forEach(function(d) {
		// 	var i = d.year-minYear;
		// 	if (i<=1){
		// 		if (d.month > maxMonth[i]) maxMonth[i] = d.month;
		// 		if (d.month < minMonth[i]) minMonth[i] = d.month;
		// 	}
		// });
		var count = 0;
		BigRadial_continent.radius(function(d) { 
				// count = count + 1;
				// if (count == 1) return 0;
				// if (k%3==0) return rLine(d.cal_case);
				// else if (k%3==1) return rLine(d.cal_death);
				// else return rLine(d.suspect);
				return rLine(d.value);

			 })
			.angle(function(d) { return (d.month-1)*avg_angle - angle_diff + avg_angle/31*d.day + Math.PI/2; });
		
		var bb = g.append("g")
			.data(data)
			.attr("class", "Continent_radarArea_"+name+continent+(k%3));

		var blobWrapper = g.select(".Continent_radarArea_"+name+continent+(k%3));

		blobWrapper.append("path")
			.attr("id", "radarArea")
			.attr("class", "Continent_radarArea_"+name+continent+(k%3))
			.attr("clip-path", "url(#Line_clip)")
			.attr("d", function(d) { return BigRadial_continent(data); })
			.attr("year", function(d) { return d.year; })
			.attr("continent", continent2)
			.attr("name", name)
			.attr("k", k%3)
			.attr("opa", function(d) { return Line_opacity[k%3]; })
			.attr("transform", "translate(" + 999 + "," + 0 + ")")
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
					var newX =  -225;
					var newY =  30;	
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



