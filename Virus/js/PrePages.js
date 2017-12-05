var jsRects = [
   { "px": 100, "py": 650,"label" : "Europe"},
   { "px": 250, "py": 650,"label" : "Asia"},
	{ "px": 400, "py": 650,"label" : "N-America"},
	{ "px": 550, "py": 650,"label" : "S-America"},
	{ "px": 700, "py": 650,"label" : "Africa"},
	{ "px": 850, "py": 650,"label" : "Australia"}
];
	
var CircleEndPos = [
   { "px": 100, "py": 500},
   { "px": 300, "py": 450},
   { "px": 580, "py": 402},
   { "px": 850, "py": 450},
   { "px": 750, "py": 480},
   { "px": 1100, "py": 425},
   { "px": 1100, "py": 350},
   { "px": 1150, "py": 480},
   { "px": 1190, "py": 408},
   { "px": 1300, "py": 409},
   { "px": 1250, "py": 500},
   { "px": 1350, "py": 550}
];
	
var CircleStartPos = [
   { "px": -300, "py": 300},
   { "px": 0, "py": 1200},
   { "px": 200, "py": -100},
   { "px": 900, "py": 1000},
   { "px": 400, "py": 1000},
   { "px": 800, "py": 900},
   { "px": 1000, "py": -100},
   { "px": 1100, "py": 1000},
   { "px": 900, "py": -100},
   { "px": 1800, "py": 400},
   { "px": 1400, "py": 1000},
   { "px": 1700, "py": 1200}
];


//console.log(CirclePos[0].px);



	
	
var svgContainer = d3.select("body").append("svg")
                                     .attr("width", 1440)
                                     .attr("height", 800);
	

	
var backImage = svgContainer.append("image")
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", "1440")
            .attr("height", "800")
	        .attr("xlink:href", "image/HZBackground.png")
	        .style("opacity",0);



//d3.select(backImage[0][0]).style("opacity",0.5);	
	
var flag = false;
d3.csv("data/PrePageData.csv", typechange,render);


	
function typechange(d) {

  d.number = +d.number;
  d.posx = +d.posx;
  d.posy = +d.posy;
  d.nmax = +d.nmax;
  return d;
}

var rects = svgContainer.selectAll("rect")
                        .data(jsRects);
	
	rects.enter().append("rect")
	.attr("x",function (d) { return 200 + d.px; })
    .attr("y",function (d) { return d.py; })
    .attr("width",110)
    .attr("height",10)
    .attr("rx",5)
    .attr("ry",5)
    .style("fill","grey")
	.style("opacity",0);

var texts = svgContainer.selectAll("text")
                        .data(jsRects);
	
	texts.enter().append("text")
	.attr("x",function (d) { return 220 + d.px; })
    .attr("y",function (d) { return 30 + d.py; })
    .text(function(d) {return d.label;})
    .style("fill","grey")
	.style("opacity",0);
	
	//tests = svgContainer.selectAll("rect");
	//tests[1].style("fill","yellow");
	//d3.select(rects[0][1]).style("fill","yellow");

var tips_exist = true;
var tips_rect = svgContainer.append("rect")
            .attr("x",448)
             .attr("y",333)
    		.attr("width",545)
			.attr("height",62)
			.attr("rx",22)
			.attr("ry",22)
			.style("fill","#979797")
			.style("opacity",0);

var tips_text = svgContainer.append("text")
	.attr("x",475)
    .attr("y",368)
    .text("hover upon circles to see fatality number & breakout regions")
    .style("font-family","Avenir")
	.style("font-weight",900)
    .style("text-align","left")
    .style("fill-opacity",0)
    .style("fill","#9c9c9c");
	


/*var AppearDelta;
var backAlpha = 0;
function AppearAnimation(animetime)
{

	backImage[0][0].transition.duration(1000)
		   .attr("opacity",backAlpha);	
	for(var i = 0; i < 6; i++)
	{
		texts[0][i].transition.duration(1000)
		           .attr("opacity",0);	
		
	}
	
	
	
}
function alphaIncrease()
{
	backAlpha += 1 / AppearDelta;
	if(backAlpha >= 1)
		backAlpha = 1;

	d3.select(backImage[0][0]).style("opacity",backAlpha);	
	for(var i = 0; i < 6; i++)
	{
		d3.select(texts[0][i]).style("opacity",backAlpha);	
		d3.select(rects[0][i]).style("opacity",backAlpha);		
	}
}*/
	
var circles;
var transparentCircles;
function render(data)
{
	window.onscroll = function()
{
	var t = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(t);
	 console.log(flag);
	
	if(t >= 1200 && t < 1750 && !flag)
	{
		flag = true;
		var appearAnimeTime = 1000;
        AppearAnimation(appearAnimeTime);
		TipsBlinkAnimation(appearAnimeTime);
		CircleMoveInAnimation(appearAnimeTime);
	}
	else if(t > 1800 && flag)
	{
		flag = false;
		CircleMoveOutAnimation();
		DisappearAnimation()
	}
	
}
	
	circles = svgContainer.selectAll("circle")
	            .data(data);
	
	transparentCircles = svgContainer.selectAll("circle")
	            .data(data);
	
	var text;
			   transparentCircles.enter().append("circle")
	            .attr("cx", function (d) { return -5000; })
                .attr("cy", function (d) { return -5000; })
                .attr("r", function (d) { return 10 + d.nmax/1.5; })
                .style("fill", function(d) { return d.color; })
	            .style("fill-opacity",0.4);
		   
	circles.enter().append("circle")
	            .attr("cx", function (d) { return -5000; })
                .attr("cy", function (d) { return -5000; })
                .attr("r", function (d) { return 10 + d.number/1.5; })
                .style("fill", function(d) { return d.color; })
	            .on("mouseover", function(d){
		         if(tips_exist)
				{
					tips_rect.remove();
					tips_text.remove();
					tips_exist = false;
					
				}
		         var s = d.area;
		         if(d.nmax >  d.number)
				{
					 text = svgContainer.append("text")
	                                 .attr("x", d.posx)
                                     .attr("y", d.posy + 40 + d.number/1.5)
                                     .text(d.number + ',000,000 ~ ' + d.nmax + ',000,000 deaths')
                                     .style("fill",d.color);
				}
		        else
				{
							         text = svgContainer.append("text")
	                                 .attr("x", d.posx)
                                     .attr("y", d.posy + 40 + d.number/1.5)
                                     .text(d.number + ',000,000 deaths')
                                     .style("fill",d.color);
				}

		         
		         for(var i = 0; i < s.length;i++)
					 {
						 if(s.charAt(i)== '1')
							 {
								 d3.select(rects[0][i]).style("fill", d.color);
								 d3.select(texts[0][i]).style("fill", d.color);
								 var left_vertex =  jsRects[i];
								 
								 var left_x = jsRects[i].px + 200;
								 var left_y = jsRects[i].py;
								 var right_x = jsRects[i].px + 310;
								 var right_y = jsRects[i].py;
								 
								 var triPos = d.posx + ',' + d.posy  + " " + left_x + ',' + left_y + " " + right_x + ',' + right_y;
								 
								// console.debug(triPos);
								 svgContainer.append('polygon')
	                            .attr('points', triPos)
	                            .style("fill",d.color)
								.style("fill-opacity",0.4);
							 }
						 
					 }
		         
	              })
	             .on("mouseout", function(d){
		         var s = d.area;
		         for(var i = 0; i < s.length;i++)
					 {

								 d3.select(rects[0][i]).style("fill","grey");
					         	 d3.select(texts[0][i]).style("fill","grey");
						         svgContainer.selectAll("polygon").remove();
						         text.remove();
					 }
		         
	              });	

	//CircleInsertAnimation(1000);
}


var AppearDelta;
var backAlpha = 0;
function AppearAnimation(animetime)
{
	
	d3.select(backImage[0][0]).transition()
		.duration(1000)
		.style("opacity",1);	
	for(var i = 0; i < 6; i++)
	{
		d3.select(texts[0][i]).transition().duration(1000)
		           .style("opacity",1);	
		d3.select(rects[0][i]).transition().duration(1000)
		           .style("opacity",1);	
		
	}
	
}
function DisappearAnimation()
{
	
	d3.select(backImage[0][0]).transition()
		.duration(1000)
		.style("opacity",0);	
	for(var i = 0; i < 6; i++)
	{
		d3.select(texts[0][i]).transition().duration(1000)
		           .style("opacity",0);	
		d3.select(rects[0][i]).transition().duration(1000)
		           .style("opacity",0);	
		
	}
		
}
function alphaIncrease()
{
	backAlpha += 1 / AppearDelta;
	if(backAlpha >= 1)
		backAlpha = 1;

	d3.select(backImage[0][0]).style("opacity",backAlpha);	
	for(var i = 0; i < 6; i++)
	{
		d3.select(texts[0][i]).style("opacity",backAlpha);	
		d3.select(rects[0][i]).style("opacity",backAlpha);		
	}
}

var alpha_rect = 0;
var alpha_text = 0;
var rect_helper = 0.21;
var text_helper = 1;
function TipsBlinkAnimation(animetime)
{
	//AppearDelta = animetime / 10;
    var timer = setInterval(TipsAlphaChange,10);
	
}
function TipsAlphaChange()
{
	alpha_rect += rect_helper / AppearDelta;
	alpha_text += text_helper / AppearDelta
	
	if(alpha_text >= 1 || alpha_text <= 0)
	{
		rect_helper *= -1;	
		text_helper *= -1;
	}
   
	d3.select(tips_rect[0][0]).style("opacity",alpha_rect);	
    d3.select(tips_text[0][0]).style("fill-opacity",alpha_text);	
	
}


var CircleAnimeDelta;
var t_record = 0;
function CircleMoveInAnimation(animetime)
{
	
	for(var i = 0; i < circles[0].length; i++)
	{
		d3.select(circles[0][i])
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
		
		d3.select(transparentCircles[0][i])
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
	}
	
	for(var i = 0; i < circles[0].length; i++)
	{
		d3.select(circles[0][i]).transition()
			.duration(1500)
		    .attr("cx",CircleEndPos[i].px)
		    .attr("cy",CircleEndPos[i].py);
		
		d3.select(transparentCircles[0][i]).transition()
			.duration(1500)
		    .attr("cx",CircleEndPos[i].px)
		    .attr("cy",CircleEndPos[i].py);
		
	}
			
}
function CircleMoveOutAnimation()
{
	
	/*for(var i = 0; i < circles[0].length; i++)
	{
		d3.select(circles[0][i])
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
		
		d3.select(transparentCircles[0][i])
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
	}*/
	
	for(var i = 0; i < circles[0].length; i++)
	{
		d3.select(circles[0][i]).transition()
			.duration(1500)
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
		
		d3.select(transparentCircles[0][i]).transition()
			.duration(1500)
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
		
	}
			
}
function CircleMove()
{
	
	t_record += 1.0 / CircleAnimeDelta;
	//console.log(t_record >= 1);
	if(t_record >= 1)
		t_record = 1;
	//console.log(t_record);
	for(var i = 0; i < circles[0].length; i++)
	{
		var tx = CircleStartPos[i].px + t_record * (CircleEndPos[i].px - CircleStartPos[i].px);
		var ty = CircleStartPos[i].py + t_record * (CircleEndPos[i].py - CircleStartPos[i].py);
		
				
		var t = t_record;
		var x0 = CircleStartPos[i].px;
		var x1 = CircleEndPos[i].px;
		
		var y0 = CircleStartPos[i].py;
		var y1 = CircleEndPos[i].py;
		
		tx = x0 + 6 * (x1-x0) * ((t * t) / 2.0 - (t * t * t) / 3.0) ;
		ty = y0 + 6 * (y1-y0) * ((t * t) / 2.0 - (t * t * t) / 3.0) ;
		
		//console.log(ty);
		
		d3.select(circles[0][i]).style("cx",tx);
		d3.select(circles[0][i]).style("cy",ty);
		
		d3.select(transparentCircles[0][i]).style("cx",tx);
		d3.select(transparentCircles[0][i]).style("cy",ty);
	}
	
	
	
		
}
