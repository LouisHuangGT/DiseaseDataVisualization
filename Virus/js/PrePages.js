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

var Titletext = [
   { "px": 77, "py": 101,"label" : "SIGNIFICANT BREAKOUTS BEFORE 21ST CENTURY","size" : 24},
   { "px": 106, "py": 152,"label" : "plague","size" : 14},
	{ "px": 191, "py": 152,"label" : "small pox","size" : 14},
	{ "px": 293, "py": 152,"label" : "cholera","size" : 14},
	{ "px": 384, "py": 152,"label" : "influenza","size" : 14},
	{ "px": 1098, "py": 158,"label" : "death number","size" : 14},
	{ "px": 1267, "py": 158,"label" : "Min-Max","size" : 14}
];

var TitleCircle = [
   { "px": 90, "py": 148,"r" : 18,"color" : "#30ffe8"},
    { "px": 175, "py": 148,"r" : 18,"color" : "#ffd930"},
	{ "px": 277, "py": 148,"r" : 18,"color" : "#eb6e6e"},
	{ "px": 368, "py": 148,"r" : 18,"color" : "#8b7cf1"},
	{ "px": 1059, "py": 150,"r" : 7,"color" : "#30ffe8"},
	{ "px": 1070, "py": 150,"r" : 11,"color" : "#30ffe8"},
	{ "px": 1085, "py": 150,"r" : 15,"color" : "#30ffe8"},
	{ "px": 1240, "py": 155,"r" : 25,"color" : "#30ffe8"},
	{ "px": 1240, "py": 155,"r" : 39,"color" : "#30ffe8"}
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


/*var text1 = svgContainer.selectAll("text")
                        .data(Titletext)
                        .enter()
                        .append("text")
                        .attr("x",function(d){return d.px;})
    					.attr("y",function(d){return d.py;})
    					.text(function(d){return d.label;})
    					.style("fill","white")
						.style("font-size",function(d){return d.size;});*/


	
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
	.style("opacity",0)
    .style("font-family","Avenir");

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
	
	





var circlesHZ;
var transparentCircles;
var titleTextArray = new Array();
var titleCircleArray = new Array();
function render(data)
{
	/*window.onscroll = function()
   {
	var t = document.documentElement.scrollTop || document.body.scrollTop;
   // console.log(t);
	// console.log(flag);
		console.log("Calling this function ZHANG");
	
	if(t > 500 && t < 1000)
	{
		diseasepoint
          .transition()
           .duration(1500)
            .attr("cx", function(d) {
                  			      return d[0];
                  			      })
                  			.attr("cy", function(d) {
                  			      return d[1];
                  			      })
                  			.attr("r", function(d) {
                  			       return 10;
                  			       });
                  		diseaselabel
                  		.transition()
                  			.duration(1500)
                  			.attr("x", function(d) {
                  			      return d[0]+15;
                  			      })
                  			.attr("y", function(d) {
                  			      return d[1]+6;
                  			      });
	}
	if(t >= 1200 && t < 1750 && !flag)
	{
		flag = true;
		var appearAnimeTime = 1000;
        AppearAnimation(appearAnimeTime);
		TipsBlinkAnimation(appearAnimeTime);
		CircleMoveInAnimation(appearAnimeTime);
	}
	else if(flag && ((t > 1800 && t < 1900) ||(t < 1200 && t > 1100) ))
	{
		flag = false;
		CircleMoveOutAnimation();
		TipsBlinkAnimationStop()
		DisappearAnimation()
	}
		
	
		
		
	
	
}*/
	
	circlesHZ = svgContainer.selectAll("circle")
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
		   
	circlesHZ.enter().append("circle")
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
	
for(var i = 0; i < Titletext.length;i++)
{
   titleTextArray[i] = svgContainer.append("text")
	            .attr("x",Titletext[i].px)
    			.attr("y",Titletext[i].py)
    			.text(Titletext[i].label)
    			.style("fill","white")
	            .style("opacity",0)
				.style("font-size",Titletext[i].size)
	            .style("font-family","Avenir");

}


for(var i = 0; i < TitleCircle.length;i++)
{
   
	titleCircleArray[i] = svgContainer.append("circle")
	            .attr("cx", TitleCircle[i].px)
                .attr("cy", TitleCircle[i].py)
                .attr("r", TitleCircle[i].r / 2)
                .style("fill", TitleCircle[i].color)
		        .style("fill-opacity",0);
	
	/*if(i == TitleCircle.length - 1)
	{
			   svgContainer.append("circle")
	            .attr("cx", TitleCircle[i].px)
                .attr("cy", TitleCircle[i].py)
                .attr("r", TitleCircle[i].r / 2)
                .style("fill", TitleCircle[i].color)
		        .style("fill-opacity",0.49);
	}
	else
	{
		svgContainer.append("circle")
	            .attr("cx", TitleCircle[i].px)
                .attr("cy", TitleCircle[i].py)
                .attr("r", TitleCircle[i].r / 2)
                .style("fill", TitleCircle[i].color);
		        .style("fill-opacity",0);
	}*/


}
	


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
	for(var i = 0; i < titleTextArray.length; i++)
	{
		titleTextArray[i].transition().duration(1000)
		                .style("opacity",1);
		/*d3.select(text_number[i][0][0]).transition().duration(1000)
		                .style("opacity",0);	*/
	}
	for(var i = 0; i < titleCircleArray.length; i++)
	{
		if(i == titleCircleArray.length - 1)
			titleCircleArray[i].transition().duration(1000)
		                .style("fill-opacity",0.49);
		else
		titleCircleArray[i].transition().duration(1000)
		                .style("fill-opacity",1);
		
		/*d3.select(text_number[i][0][0]).transition().duration(1000)
		                .style("opacity",0);	*/
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
	
	for(var i = 0; i < titleTextArray.length; i++)
	{
		titleTextArray[i].transition().duration(1000)
		                .style("opacity",0);
		/*d3.select(text_number[i][0][0]).transition().duration(1000)
		                .style("opacity",0);	*/
	}
	for(var i = 0; i < titleCircleArray.length; i++)
	{
		titleCircleArray[i].transition().duration(1000)
		                .style("fill-opacity",0);
		/*d3.select(text_number[i][0][0]).transition().duration(1000)
		                .style("opacity",0);	*/
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
var timer
function TipsBlinkAnimation(animetime)
{
	//AppearDelta = animetime / 10;
    timer = setInterval(TipsAlphaChange,10);
	
}
function TipsBlinkAnimationStop()
{
	clearInterval(timer);
	alpha_rect = 0;
    alpha_text = 0;
	rect_helper = 0.21;
	text_helper = 1;
	d3.select(tips_rect[0][0]).transition().duration(1000)
		.style("opacity",alpha_rect);	
    d3.select(tips_text[0][0]).transition().duration(1000)
		.style("fill-opacity",alpha_text);	
	
}

function TipsAlphaChange()
{
	alpha_rect += rect_helper / 100;
	alpha_text += text_helper / 100;

	if(alpha_text >= 1 || alpha_text <= 0)
	{
		rect_helper *= -1;	
		text_helper *= -1;
	}
   
	d3.select(tips_rect[0][0]).style("opacity",alpha_rect);	
    d3.select(tips_text[0][0]).style("fill-opacity",alpha_text);	
	
}


function CircleMoveInAnimation(animetime)
{
	
	for(var i = 0; i < circlesHZ[0].length; i++)
	{
		d3.select(circlesHZ[0][i])
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
		
		d3.select(transparentCircles[0][i])
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
	}
	
	for(var i = 0; i < circlesHZ[0].length; i++)
	{
		d3.select(circlesHZ[0][i]).transition()
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
	

	
	for(var i = 0; i < circlesHZ[0].length; i++)
	{
		d3.select(circlesHZ[0][i]).transition()
			.duration(1500)
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
		
		d3.select(transparentCircles[0][i]).transition()
			.duration(1500)
		    .attr("cx",CircleStartPos[i].px)
		    .attr("cy",CircleStartPos[i].py);
		
	}
			
}
