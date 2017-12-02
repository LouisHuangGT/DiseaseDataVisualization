var PlateBig_drag = d3.behavior.drag();
var PlateSmall_drag = d3.behavior.drag();
var PreBigx = 0, PreBigy = 0, PreSmallx = 0, PreSmally = 0;
var DegreeBig = 0, DegreeSmall = 0;
var SeondPage = false;
var G_DieaseName = 'overview';
var G_ContinentName = 'overview';
var MinYear = 2000;
var MaxYear = 2018;

PlateBig_drag.on("drag", function () {
	d3.select("#white_big")
		.style("opacity", 0);
	var x = d3.mouse(this)[0], y = d3.mouse(this)[1];
	if (PreBigx == 0 && PreBigy == 0) { PreBigx = x; PreBigy = y; }
	else{
		var degree = Math.atan2(-PreBigy*x+PreBigx*y, PreBigx*x+PreBigy*y) /Math.PI*180;
		PreBigx = x; PreBigy = y;
		DegreeBig = DegreeBig + degree;
		d3.select("#words_outside")
			.style("-webkit-transform", "rotate("+DegreeBig+"deg)")
			.style("-moz-transform", "rotate("+DegreeBig+"deg)")
			.style("-ms-transform", "rotate("+DegreeBig+"deg)")
			.style("-o-transform", "rotate("+DegreeBig+"deg)")
			.style("transform", "rotate("+DegreeBig+"deg)");
	}	
});

PlateBig_drag.on("dragend", function () {
	var k = Math.floor(((Math.floor(DegreeBig) % 360) + 360) % 360 / 60)+1;
	var Continent_icon = ["overview","africa","europe","asia","australia","south_america","north_america"];
	d3.select("#white_big")
		.attr("href","image/"+Continent_icon[k]+".png")
		.style("opacity", 1.0);
	DegreeBig = Math.floor(DegreeBig / 60) * 60 + 30;
	d3.select("#words_outside")
			.style("-webkit-transform", "rotate("+DegreeBig+"deg)")
			.style("-moz-transform", "rotate("+DegreeBig+"deg)")
			.style("-ms-transform", "rotate("+DegreeBig+"deg)")
			.style("-o-transform", "rotate("+DegreeBig+"deg)")
			.style("transform", "rotate("+DegreeBig+"deg)");
	PreBigx = 0; PreBigy = 0;

	var ContinentName = ["overview","Africa","Europe","Asia","Australia","South America","North America"];
	G_ContinentName = ContinentName[k];
	d3.selectAll(".mapCircle").transition().duration(1000)
					.style("fill-opacity", function(d) { if ( (d.year>=MinYear && d.year<MaxYear)
														&& (d.Continent==G_ContinentName || G_ContinentName=='overview') 
														&& (d.type==G_DieaseName || G_DieaseName=='overview') 
														) return 1; return 0;});

});

PlateSmall_drag.on("drag", function () {
	//hide tips
	d3.select(".LT_tooltip")
		.style('opacity', 0)
	d3.select(".LT_tooltext")
		.style("opacity", 0);

	d3.select("#white_small")
		.style("opacity", 0)
	var x = d3.mouse(this)[0], y = d3.mouse(this)[1];
	if (PreSmallx == 0 && PreSmally == 0) { PreSmallx = x; PreSmall = y; }
	else{
		var degree = Math.atan2(-PreSmally*x+PreSmallx*y, PreSmallx*x+PreSmally*y) /Math.PI*180;
		PreSmallx = x; PreSmally = y;
		DegreeSmall = DegreeSmall + degree;
		d3.select("#words_inside")
			.style("-webkit-transform", "rotate("+DegreeSmall+"deg)")
			.style("-moz-transform", "rotate("+DegreeSmall+"deg)")
			.style("-ms-transform", "rotate("+DegreeSmall+"deg)")
			.style("-o-transform", "rotate("+DegreeSmall+"deg)")
			.style("transform", "rotate("+DegreeSmall+"deg)");
	}
});

PlateSmall_drag.on("dragend", function () {
	SeondPage = true;
	var k = Math.floor(((Math.floor(DegreeSmall) % 360) + 360) % 360 / 90)+1;
	var Diease_icon = ["overview","zika","ebola","h1n1","sars"];
	d3.select("#center_img")
		.attr("href","image/"+Diease_icon[k]+"_icon.png");
	d3.select("#white_small")
		.attr("href","image/"+Diease_icon[k]+".png")
		.style("opacity", 1.0);

	//hide header
	d3.selectAll(".LT_head")
		.style("opacity", 0);
	//wordle
	Wordle(k);
	//ArcBar
	showRadialProgress(k);
	//symptom
	d3.selectAll("#symptom_img").transition().duration(1000)
		.style("opacity", 1.0);
	//little Radar Charts
	d3.selectAll("#Little_Radar").transition().duration(1000)
		.style("opacity", 1.0);
	//map circles
	var DieaseName = ["overview","ZIKA","EBOLA","H1N1","SARS"];
	G_DieaseName = DieaseName[k];
	d3.selectAll(".mapCircle").transition().duration(1000)
					.style("fill-opacity", function(d) { if ( (d.year>=MinYear && d.year<MaxYear)
														&& (d.Continent==G_ContinentName || G_ContinentName=='overview') 
														&& (d.type==G_DieaseName || G_DieaseName=='overview') 
														) return 1; return 0;});




	DegreeSmall = Math.floor(DegreeSmall / 90) * 90 + 45;
	d3.select("#words_inside")
			.style("-webkit-transform", "rotate("+DegreeSmall+"deg)")
			.style("-moz-transform", "rotate("+DegreeSmall+"deg)")
			.style("-ms-transform", "rotate("+DegreeSmall+"deg)")
			.style("-o-transform", "rotate("+DegreeSmall+"deg)")
			.style("transform", "rotate("+DegreeSmall+"deg)");
	PreSmallx = 0; PreSmally = 0;

	var Radar_transition = d3.select("#Radar_axis")
							.transition().duration(1000);
	var avg_angle = total_angle / 12;
	var angle_diff = Math.PI +  (total_angle - Math.PI)/2;

	var month_ratio =d3.scale.linear()
				.range([radius/3*2, radius])
				.domain([0, 12]);
	Radar_transition.selectAll("line")
					.attr("x1", function(d){ return radius*(2/3+1/36) * Math.cos(avg_angle*(d.year-2000) - angle_diff); })
					.attr("y1", function(d){ return radius*(2/3+1/36) * Math.sin(avg_angle*(d.year-2000) - angle_diff); })
					.attr("x2", function(d){ return radius * Math.cos(avg_angle*(d.year-2000) - angle_diff); })
					.attr("y2", function(d){ return radius * Math.sin(avg_angle*(d.year-2000) - angle_diff); })
					.style("stroke-width", function(d) { if (d.year>=2000 && d.year<=2012) return "1px"; return "0px"});	

	Radar_transition.selectAll("text")
		.attr("x", function(d){ return radius * 1.05 * Math.cos(avg_angle*(d.year-2000) - angle_diff + avg_angle/2); })
		.attr("y", function(d){ return radius * 1.05 * Math.sin(avg_angle*(d.year-2000) - angle_diff + avg_angle/2); })
		.style("font-size", function(d) { if (d.year>=2000 && d.year<2012 && d.year!="2018") return "12px"; return "0px"})
		.text(function(d, i){ return d.month;});

	var Diease_name = ["overview","ZIKA","EBOLA","H1N1","SARS"];
	d3.selectAll("#radarArea")
		.transition().duration(1000)
		.style("fill-opacity", 0)	
		.style("stroke-width", 0 + "px");
	d3.selectAll(".radarArea_"+Diease_name[k])
		.transition().duration(1000)
		.style("fill-opacity", 0.35)	
		.style("stroke-width", 1.5 + "px");

	d3.selectAll(".Little_radarArea_"+Diease_name[(k%4)+1])
		.transition().duration(1000)
		// .style("fill-opacity", 0.35)	
		.style("stroke-width", 1.5 + "px");
		

	d3.selectAll(".radarCircle")
			.transition().duration(1000)
			.style("fill-opacity", 0.0);
});






