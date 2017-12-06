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
		var s = d3.select("#words_outside").style("x");
		var dx = parseFloat(s.substring(0, s.length-2))+imageY;
		s = d3.select("#words_outside").style("y");
		var dy = parseFloat(s.substring(0, s.length-2))+imageY;
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
														) return 0.8; return 0;});

	d3.selectAll("#radarArea").attr("transform", "translate(" + 999 + "," + 0 + ")");
	d3.selectAll("#radarArea").transition().duration(1000)
		.style("fill-opacity", 0)	
		.style("stroke-width", 0 + "px");
	var Continent_name = ["Whole_world","Africa","Europe","Asia","Australia","South_America","North_America"];
	for (var i =0; i <3; i++)
		{	
			d3.selectAll(".Continent_radarArea_"+G_DieaseName+Continent_name[k]+i).attr("transform", "translate(" + 0 + "," + 0 + ")");
			d3.selectAll(".Continent_radarArea_"+G_DieaseName+Continent_name[k]+i)
				.transition().duration(1000)
				.style("fill-opacity", function(d) { return d3.select(this).attr('opa');})	
				.style("stroke-width", 1.5 + "px");
			}




	d3.selectAll(".Little_radarArea_"+G_DieaseName).attr("transform", "translate(" + 0 + "," + 0 + ")");
	d3.selectAll(".Little_radarArea_"+G_DieaseName).transition().duration(1000)
		.style("fill-opacity", function(d) { var year = d3.select(this).attr('year');
											if ( (year>=MinYear && year<MaxYear)
											&& (G_ContinentName==d3.select(this).attr('continent'))  
											) return d3.select(this).attr('opa'); return 0;})
		.style("stroke-width", function(d) { var year = d3.select(this).attr('year');
											if ( (year>=MinYear && year<MaxYear)
											&& (G_ContinentName==d3.select(this).attr('continent'))  
											) return "1.5px"; return "0px";});
	d3.selectAll(".Little_radarText_"+G_DieaseName).attr("transform", "translate(" + 0 + "," + 0 + ")");
	d3.selectAll(".Little_radarText_"+G_DieaseName).transition().duration(1000)
		.style("fill-opacity", function(d) { var year = d3.select(this).attr('year');
											if ( (year>=MinYear && year<MaxYear)
											&& (G_ContinentName==d3.select(this).attr('continent'))  
											) return 1.0; return 0;});


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

function ShowPage(i){
	if (i==1){
		window.location.reload();
	}

}

PlateSmall_drag.on("dragend", function () {
	SeondPage = true;
	var k = Math.floor(((Math.floor(DegreeSmall) % 360) + 360) % 360 / 90)+1;

	var Diease_icon = ["overview","zika","ebola","h1n1","sars"];
	var Diease_name2 = ["","ZIKA","EBOLA","H1N1","SARS"];

	// change slider
	if (Diease_name2[k]=="ZIKA") G_color = "#8b7cf1";
	if (Diease_name2[k]=="EBOLA") G_color = "#30ffe8";
	if (Diease_name2[k]=="H1N1") G_color = "#ffd930";
	if (Diease_name2[k]=="SARS") G_color = "#eb6e6e";
	d3.selectAll("#Scale_slider_rect").style("opacity", 0.8);
	d3.selectAll(".Scale_slider_text").style("fill", G_color);
	d3.select("#Scale_slider").style("opacity", 1.0);
	d3.select("#Scale_slider").select("#handle-two").style("background", G_color).style("left", "100%");
	d3.select("#Scale_slider").select(".d3-slider-range").style("background", G_color).style("right", "0%");

	d3.select("#Radar_slider").select("#handle-one").style("left", "0%");
	d3.select("#Radar_slider").select("#handle-two").style("left", "100%");
	d3.select("#Radar_slider").select(".d3-slider-range").style("right", "0%");
	d3.select("#Radar_slider").select(".d3-slider-range").style("left", "0%");

	d3.select("#center_img")
		.attr("href","image/"+Diease_icon[k]+"_icon.png");
	d3.select("#white_small")
		.attr("href","image/"+Diease_icon[k]+".png")
		.style("opacity", 1.0);

	//hide header
	LT_g.selectAll(".LT_head").transition().duration(1000).style('opacity', 0);
	LT_g.select("#legend_img").transition().duration(1000).style('opacity', 0);
	LT_g.select("#L1_img").transition().duration(1000).attr("href","image/L1_"+Diease_name2[k]+".jpeg").style('opacity', 1);
	LT_g.select("#L2_img").transition().duration(1000).attr("href","image/L2_"+Diease_name2[k]+".jpeg").style('opacity', 1);
	LT_g.selectAll(".Key_text").remove();
	LT_g.selectAll(".Key_date").remove();
	LT_g.selectAll(".Key_circle").remove();
	// d3.selectAll(".LT_head")
	// 	.style("opacity", 0);
	// d3.select("#legend_img")
	// 	.style("opacity", 0);

	//wordle
	// Wordle(k);

	//ArcBar
	showRadialProgress(k);
	//symptom
	// d3.selectAll("#symptom_img").transition().duration(1000)
	// 	.style("opacity", 1.0);
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
														) return 0.8; return 0;});




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

	Radar_transition.selectAll("#text_legend")
		.attr("x", function(d){ return radius * 1.05 * Math.cos(avg_angle*(d.year-2000) - angle_diff + avg_angle/2); })
		.attr("y", function(d){ return radius * 1.05 * Math.sin(avg_angle*(d.year-2000) - angle_diff + avg_angle/2); })
		.style("font-size", function(d) { if (d.year>=2000 && d.year<2012 && d.year!="2018") return "12px"; return "0px"})
		.text(function(d, i){ return d.month;});

	Radar_transition.selectAll(".legend_number").style("opacity", 1.0);
	var tnum = rTextMax[k];
	Radar_transition.selectAll("#legend_right").text(tnum);
	Radar_transition.selectAll("#legend_mid").text(parseInt(tnum/2));

	var Diease_name = ["overview","ZIKA","EBOLA","H1N1","SARS"];
	d3.selectAll("#radarArea").attr("transform", "translate(" + 999 + "," + 0 + ")");
	d3.selectAll("#radarArea").transition().duration(1000)
		.style("fill-opacity", 0)	
		.style("stroke-width", 0 + "px");

	if (G_ContinentName == 'overview'){
		d3.selectAll(".radarArea_"+Diease_name[k]).attr("transform", "translate(" + 0 + "," + 0 + ")");
		d3.selectAll(".radarArea_"+Diease_name[k])
			.transition().duration(1000)
			.style("fill-opacity", function(d) { return d3.select(this).attr('opa');})	
			.style("stroke-width", 1.5 + "px");
	}
	else{
		var Cname = G_ContinentName;
		if (Cname == "South America") Cname = "South_America";
		if (Cname == "North_America") Cname = "North_America";
		for (var i =0; i <3; i++)
		{	
			d3.selectAll(".Continent_radarArea_"+G_DieaseName+Cname+i).attr("transform", "translate(" + 0 + "," + 0 + ")");
				d3.selectAll(".Continent_radarArea_"+G_DieaseName+Cname+i)
					.transition().duration(1000)
					.style("fill-opacity", function(d) { return d3.select(this).attr('opa');})	
					.style("stroke-width", 1.5 + "px");}

	}
	

	d3.selectAll(".Little_radarArea_"+Diease_name[k]).attr("transform", "translate(" + 0 + "," + 0 + ")");
	d3.selectAll(".Little_radarArea_"+G_DieaseName).transition().duration(1000)
		.style("fill-opacity", function(d) { var year = d3.select(this).attr('year');
											if ( (year>=MinYear && year<MaxYear)
											&& (G_ContinentName==d3.select(this).attr('continent'))  
											) return d3.select(this).attr('opa'); return 0;})
		.style("stroke-width", function(d) { var year = d3.select(this).attr('year');
											if ( (year>=MinYear && year<MaxYear)
											&& (G_ContinentName==d3.select(this).attr('continent'))  
											) return "1.5px"; return "0px";});

	d3.selectAll(".Little_radarText_"+Diease_name[k]).attr("transform", "translate(" + 0 + "," + 0 + ")");
	d3.selectAll(".Little_radarText_"+G_DieaseName).transition().duration(1000)
		.style("fill-opacity", function(d) { var year = d3.select(this).attr('year');
											if ( (year>=MinYear && year<MaxYear)
											&& (G_ContinentName==d3.select(this).attr('continent'))  
											) return 1.0; return 0;});

	d3.selectAll(".radarCircle")
			.transition().duration(1000)
			.style("fill-opacity", 0.0);
});