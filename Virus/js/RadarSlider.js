RadarSlider();
function RadarSlider(){
	d3.select("body")
		.append("div")
		.attr("id","Radar_slider")
		.style("left", Radar_margin.left + (Radar_width/5) + "px")
		.style("top", Radar_height/5*3 + Radar_margin.top + Radar_margin.bottom*2.75 + "px")
		.style("width", Radar_width/5*3 + "px")
		.call(d3.slider()
			.min(2000).max(2018)
			.value([2000, 2018])
			.step(1)
			.on("slide", function(evt, value) {
				if (!SeondPage){

				var Radar_transition = d3.select("#Radar_axis")
										.transition().duration(1000);
				var avg_angle = total_angle / (value[1]-value[0]);
				var angle_diff = Math.PI +  (total_angle - Math.PI)/2;

				var month_ratio =d3.scale.linear()
							.range([radius/3*2, radius])
							.domain([0, 12]);

				Radar_transition.selectAll("line")
					.attr("x1", function(d){ return radius*(2/3+1/36) * Math.cos(avg_angle*(d.year-value[0]) - angle_diff); })
					.attr("y1", function(d){ return radius*(2/3+1/36) * Math.sin(avg_angle*(d.year-value[0]) - angle_diff); })
					.attr("x2", function(d){ return radius * Math.cos(avg_angle*(d.year-value[0]) - angle_diff); })
					.attr("y2", function(d){ return radius * Math.sin(avg_angle*(d.year-value[0]) - angle_diff); })
					.style("stroke-width", function(d) { if (d.year>=value[0] && d.year<=value[1]) return "1px"; return "0px"});	

				Radar_transition.selectAll(".legend")
					.attr("x", function(d){ return radius * 1.05 * Math.cos(avg_angle*(d.year-value[0]) - angle_diff + avg_angle/2); })
					.attr("y", function(d){ return radius * 1.05 * Math.sin(avg_angle*(d.year-value[0]) - angle_diff + avg_angle/2); })
					.style("font-size", function(d) { if (d.year>=value[0] && d.year<value[1] && d.year!="2018") return "12px"; return "0px"});

				Circle_transition = d3.selectAll("#radarWrapper")
										.transition().duration(1000);
				Circle_transition.selectAll("circle")
					.attr("cx", function(d){ return month_ratio(d.month) * Math.cos(avg_angle*(d.year-value[0]) - angle_diff + avg_angle/2); })
					.attr("cy", function(d){ return month_ratio(d.month) * Math.sin(avg_angle*(d.year-value[0]) - angle_diff + avg_angle/2); })
					.style("fill-opacity", function(d){ if (d.year>=value[0] && d.year<value[1]) return 0.8; return 0;});

					
				}

				MinYear = value[0];
				MaxYear = value[1];
				d3.selectAll(".mapCircle").transition().duration(1000)
					.style("fill-opacity", function(d) { if ( (d.year>=MinYear && d.year<MaxYear)
														&& (d.Continent==G_ContinentName || G_ContinentName=='overview') 
														&& (d.type==G_DieaseName || G_DieaseName=='overview') 
														) return 0.8; return 0;});
				d3.selectAll("#radarArea").transition().duration(1000)
					.style("fill-opacity", function(d) { var year = d3.select(this).attr('year');
														if ( (year>=MinYear && year<MaxYear)
														&& (G_ContinentName=='overview') 
														&& (G_DieaseName==d3.select(this).attr('name')) 
														) return d3.select(this).attr('opa'); return 0;})
					.style("stroke-width", function(d) { var year = d3.select(this).attr('year');
														if ( (year>=MinYear && year<MaxYear)
														&& (G_ContinentName=='overview') 
														&& (G_DieaseName==d3.select(this).attr('name')) 
														) return "1.5px"; return "0px";});

				d3.selectAll(".Little_radarArea_"+G_DieaseName).transition().duration(1000)
					.style("fill-opacity", function(d) { var year = d3.select(this).attr('year');
														if ( (year>=MinYear && year<MaxYear)
														&& (G_ContinentName==d3.select(this).attr('continent'))  
														) return d3.select(this).attr('opa'); return 0;})
					.style("stroke-width", function(d) { var year = d3.select(this).attr('year');
														if ( (year>=MinYear && year<MaxYear)
														&& (G_ContinentName==d3.select(this).attr('continent'))  
														) return "1.5px"; return "0px";});
				d3.selectAll(".Little_radarText_"+G_DieaseName).transition().duration(1000)
					.style("fill-opacity", function(d) { var year = d3.select(this).attr('year');
														if ( (year>=MinYear && year<MaxYear)
														&& (G_ContinentName==d3.select(this).attr('continent'))  
														) return 1.0; return 0;});

				}
				)
			);
}


ScaleSlider();
function ScaleSlider(){
	d3.select("#Radar_svg")
		.append("rect")
		.attr("id","Scale_slider_rect")
		.style("x", Radar_margin.left*1.03)
		.style("y", Radar_height/5*3 + Radar_margin.top + Radar_margin.bottom*2.75 +18)
		.attr("width", Radar_width*0.15)
		.attr("height", 4.8)
		.style("fill", "white")
		.style("opacity", 0.0);
	d3.select("#Radar_svg")
		.append("text")
		.attr("id","Scale_slider_rect")
		.attr("class","Scale_slider_text")
		.attr("x", Radar_margin.left*1.03+26)
		.attr("y", Radar_height/5*3 + Radar_margin.top + Radar_margin.bottom*2.75 +10)
		.attr("width", 65)
		.attr("height", 22)
		.style("fill", "white")
		.style("opacity", 0.0)
		.text("change scale")
		.style("font-size", 12+"px")
		.style("font-family","PingFangSC");
	d3.select("#Radar_svg")
		.append("text")
		.attr("id","Scale_slider_rect")
		.attr("class","Scale_slider_text")
		.attr("x", Radar_margin.left*1.03+26 -40)
		.attr("y", Radar_height/5*3 + Radar_margin.top + Radar_margin.bottom*2.75 +15 + 20)
		.attr("width", 65)
		.attr("height", 22)
		.style("fill", "white")
		.style("opacity", 0.0)
		.text("500%")
		.style("font-size", 12+"px")
		.style("font-family","PingFangSC");
	d3.select("#Radar_svg")
		.append("text")
		.attr("id","Scale_slider_rect")
		.attr("class","Scale_slider_text")
		.attr("x", Radar_margin.left*1.03+26 +70)
		.attr("y", Radar_height/5*3 + Radar_margin.top + Radar_margin.bottom*2.75 +15 +20)
		.attr("width", 65)
		.attr("height", 22)
		.style("fill", "white")
		.style("opacity", 0.0)
		.text("100%")
		.style("font-size", 12+"px")
		.style("font-family","PingFangSC");

	d3.select("body")
		.append("div")
		.attr("id","Scale_slider")
		.style("left", Radar_margin.left*1.03 + "px")
		.style("top", Radar_height/5*3 + Radar_margin.top + (Radar_margin.bottom*2.75-5) + "px")
		.style("width", Radar_width*0.15 + "px")
		.style("opacity", 0)
		.call(d3.slider()
			.min(0).max(100)
			.value([0, 100])
			.step(1)
			.on("slide", function(evt, value) {
				var scale = (100-value[1])/20+1;
				var k = 0;
				if (G_DieaseName == "H1N1") k = 1;
				if (G_DieaseName == "SARS") k = 2;
				if (G_DieaseName == "ZIKA") k = 3;
				if (G_DieaseName == "EBOLA") k = 4;
				var rLine = d3.scale.linear().range([radius*(2/3+1/36), radius]).domain([0, rLineMax[k]]);
				if (G_ContinentName == 'overview'){
					BigRadial.radius(function(d, i) { if (i==0) return 0; if (rLine(d.value*scale)>radius) return radius; return rLine(d.value*scale); });
					d3.selectAll(".radarArea_"+G_DieaseName)
						.attr("d", function(d) {return BigRadial(d); })

				}
				else{
					BigRadial_continent.radius(function(d) {if (rLine(d.value*scale)>radius) return radius; return rLine(d.value*scale); });
					var Cname = G_ContinentName;
					if (Cname == "South America") Cname = "South_America";
					if (Cname == "North_America") Cname = "North_America";
					var ii = 2;
					if (G_DieaseName=="EBOLA"||G_DieaseName=="ZIKA") ii++;
					for (var i = 0; i < ii; i++){
						d3.selectAll(".Continent_radarArea_"+G_DieaseName+Cname+i)
							.attr("d", BigRadial_continent(dataContinent[G_DieaseName+Cname+i]))
						}

				}}
				)
			);
	d3.select("#Scale_slider").select("#handle-one").style("opacity", 0);
}



//update
// function RadarSlider_update(l,r){
// 	var Radar_transition = d3.select("#Radar_slider").transition().duration(1);
// 	l = l/Radar_width*100.0;
// 	r = r/Radar_width*100.0;
// 	Radar_transition.select("#handle-one")
// 		.style("left", l +"%");
// 	Radar_transition.select("#handle-two")
// 		.style("left", r +"%");
// 	Radar_transition.select("div")
// 		.style("left", l +"%")
// 		.style("right", (100.0-r)+"%");
// }