var StorySvg2 =  d3.select("body").append("svg")
                                     .attr("width", 1440)
                                     .attr("height", 400);
StorySvg2.attr("width", swinWidth)
console.log(swinWidth);
var StroyImg2 = StorySvg2.append("image")
            .attr("x", 0)
            .attr("y", "0")
            .attr("width", swinWidth)
            .attr("height", swinWidth * 361/ 1440 )
            .style("opacity",0)
	        .attr("xlink:href", "image/Story2.png");

/*StroyImg2.transition()
		.duration(4000)
		.style("opacity",1);*/
