// var Diease_name = ["","H1N1","ZIKA","SARS","EBOLA"];


function MapDot(g, rScale, k){
	d3.csv("data/Map_case/"+Diease_name[k]+".csv", function(data) {

		var Map_Dot = g.append("g")
			.attr("id", "Map");

		//tooltip
		var tooltip = g.append("rect")
			.attr("class", "Map_tooltip")
			.attr("width", 320)
			.attr("height", 23)
			.style("opacity", 0);
		var tooltext = g.append("text")
			.attr("class", "Map_tooltext")
			.style("opacity", 0);

		//dots
		Map_Dot.selectAll(".mapCircle")
			.data(data)
		.enter().append("circle")
			.attr("class", "mapCircle")
			.attr("r", function(d){ return rScale[k](d.cal_case); })
			.attr("cx", function(d){ return d.x*25; })
			.attr("cy", function(d){ return d.y*25; })
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
						.text(Diease_name[k]+"/"+d.Country+"/"+d.year+"/"+d.cal_case)
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
	});
}