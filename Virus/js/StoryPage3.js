var StorySvg3 =  d3.select("body").append("svg")
                                     .attr("width", 1440)
                                     .attr("height", 400);
StorySvg3.attr("width", swinWidth)

var StroyImg3 = StorySvg3.append("image")
            .attr("x", 0)
            .attr("y", "0")
            .attr("width", swinWidth)
            .attr("height", swinWidth * 361/ 1440 )
            .style("opacity",0)
	        .attr("xlink:href", "image/Story3.png");

/*StroyImg2.transition()
		.duration(4000)
		.style("opacity",1);*/
