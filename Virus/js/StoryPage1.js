

var swinWidth;
if (window.innerWidth)
swinWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
swinWidth = document.body.clientWidth;

var StorySvg1 =  d3.select("body").append("svg")
                                     .attr("width", 1440)
                                     .attr("height", 400);
StorySvg1.attr("width", swinWidth)

var StroyImg = StorySvg1.append("image")
            .attr("x", 0)
            .attr("y", "0")
            .attr("width", swinWidth)
            .attr("height", swinWidth * 361/ 1440 )
            .style("opacity",0)
	        .attr("xlink:href", "image/Story1.png");

/*StroyImg.transition()
		.duration(4000)
		.style("opacity",1);*/

