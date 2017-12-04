// var Diease_name = ["","H1N1","ZIKA","SARS","EBOLA"];

Blink();
var Blink_opacity = 0.3;
var Blink_k = -1;
function Blink() {
    if (Blink_opacity >= 0.98 || Blink_opacity <= 0.3) Blink_k = -Blink_k;
    Blink_opacity = Blink_opacity+Blink_k*0.02;

    d3.selectAll('.mapCircle')
    	.style('fill-opacity', function(d){ 
    			var p = d3.select(this).style('fill-opacity');
    			if (p>0&&p<1) return Blink_opacity; 
    			else return p;
    		});
    return window.requestAnimationFrame(Blink); // NEW
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}


function MapDot(g, rScale, k){
	d3.csv("data/Map_case/"+Diease_name[k]+".csv", function(data) {

		var Map_Dot = g.append("g")
			.attr("id", "Map")
			.style('z-index', -1);

		//tooltip
		var tooltip = g.append("rect")
			.attr("class", "Map_tooltip")
			.attr("width", 165)
			.attr("height", 60)
			.style("opacity", 0)
			.style('z-index', 1);
		var tooltext = g.append("text")
			.attr("class", "Map_tooltext")
			.style("opacity", 0)
			.style('z-index', 1);
		var tooltext2 = g.append("text")
			.attr("class", "Map_tooltext")
			.style("opacity", 0)
			.style('z-index', 5);
		var tooltext3 = g.append("text")
			.attr("class", "Map_tooltext")
			.style("opacity", 0)
			.style('z-index', 5);
		var tooltext4 = g.append("text")
			.attr("class", "Map_tooltext")
			.style("opacity", 0)
			.style('z-index', 5);

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
						.text(Diease_name[k]+", "+d.year)
						.style('opacity', 0.8);
					tooltext2.attr('x', newX)
						.attr('y', newY+12)
						.transition().duration(200)
						.text('Country:'+' '+d.Country)
						.style('opacity', 0.8);
					tooltext3.attr('x', newX)
						.attr('y', newY+24)
						.transition().duration(200)
						.text('Continent:'+' '+d.Continent)
						.style('opacity', 0.8);
					tooltext4.attr('x', newX)
						.attr('y', newY+36)
						.transition().duration(200)
						.text('Total infected:'+' '+d.cal_case)
						.style('opacity', 0.8);
					tooltip.attr('x', newX-8)
						.attr('y', newY-15)
						.transition().duration(200)
						.style('opacity', 0.8)
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
					tooltext3.transition().duration(200)
						.style("opacity", 0);
					tooltext4.transition().duration(200)
						.style("opacity", 0);
				}
			})
			.on("click", function(d){
				drawTip(k, d.year, d.month);
			})
			;
	});
}