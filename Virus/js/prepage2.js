var w = 1400;
var h = 800;
var svg = d3.select("body")
                          .append("svg")
                          .attr("width",w)
                          .attr("height", h);

 var datasource = "data/historical epidemics.csv";
            d3.csv(datasource,function(error,csvdata){ 
              var transmissiondetail = new Array();
                    transmissiondetail[0] = ["Diseases that can be transmitted by direct contact are called contagious"];
                    transmissiondetail[1] = ["Airborne transmission refers to infectious agents that are spread via droplet nuclei (residue from evaporated droplets) containing infective microorganisms."];
                    transmissiondetail[2] = ["Droplet transmission occurs when respiratory droplets generated via coughing, sneezing or talking contact susceptible mucosal surfaces,such as the eyes, nose or mouth."];
                    transmissiondetail[3] = ["Diseases that are transmitted primarily by oral means may be caught through direct oral contact such as kissing, or by indirect contact such as by sharing a drinking glass or a cigarette."];
                    transmissiondetail[4] = ["Transmission due to medical procedures, such as touching a wound, an injection or transplantation of infected material. "];
                    transmissiondetail[5] = ["In the fecal-oral route, pathogens in fecal particles pass from one person to the mouth of another person. "];
                    transmissiondetail[6] = ["A vector is an organism that does not cause disease itself but that transmits infection by conveying pathogens from one host to another."];
                    transmissiondetail[7] = ["Sexually transmitted diseases such as HIV and hepatitis B  are thought to not normally be transmitted through mouth-to-mouth contact, although it is possible to transmit some STDs between the genitals and the mouth, during oral sex."];

              var showLabelFlag = -1;

              var radius = h*0.2;
              var centerx = w*2/3;
              var centery = h/2
              var disease = new Array();
              console.log(csvdata.length);
              for (var i = 0;i<csvdata.length;i++)
              {
                var angle = Math.random()*Math.PI*2 ;
                var r = Math.random()*1.5;
                // var x = r*Math.cos(angle)*radius*1.8;
                // var y = r*Math.sin(angle)*radius*1.8;
                var x = (Math.random()*2-1)*radius*1.7;
                var y = (Math.random()*2-1)*radius*1.7;
                
                disease[i] = [];
                disease[i][0] = x+centerx;
                disease[i][1] = y+centery;
                disease[i][2] = angle;
                disease[i][3] = r*radius;
                disease[i][4] = csvdata[i].name;
                disease[i][5] = csvdata[i].type;
                disease[i][6] = csvdata[i].fatality;
                disease[i][7] = 0;
                if (csvdata[i].transmission == "surfaces") disease[i][7] = 0;
                if (csvdata[i].transmission == "airborne") disease[i][7] =  1;
                if (csvdata[i].transmission == "airborne droplet") disease[i][7] =  2;
                if (csvdata[i].transmission == "bites") disease[i][7] =  3;
                if (csvdata[i].transmission == "body fluids") disease[i][7] =  4;
                if (csvdata[i].transmission == "fecal-oral") disease[i][7] =  5;
                if (csvdata[i].transmission == "food") disease[i][7] =  6;
                if (csvdata[i].transmission == "sexual contact") disease[i][7] =  7;
                disease[i][8] = csvdata[i].description;
              }

              svg.append("rect")
              .attr("width", w)
              .attr("height", h)
              .attr("fill", "black");
              var tooltip = d3.select("body")
  				.append("div")
  				.attr("class","tooltip")
  				.style("width","200px")
  				.style("background", "lightsteelblue")
  				.style("border", "0px")
  				.style("border-radius","8px")	
  				.style("pointer-events", "none")	
  				.attr("font-family", "Avenir")
  				.style("visibility","hidden");

              // Circle Vis
              var circles = svg.selectAll("circle")
                 .data(disease)
                 .enter()
                 .append("circle")
                 .attr("cx", function(d) {

                      return d[0];
                 })
                 .attr("cy", function(d) {
                      return d[1];
                 })
                 .attr("r", function(d) {
                      return 8;
                 })
                 .style("z-index",3)
                 .style("fill", function(d) {
                    if (d[5] == "virus")  return "#30ffe8";
                    if (d[5] == "bacterium") return  "#ffe551";
                    if (d[5] == "parasite") return  "#8b7cf1";
                    })
                 .on("mouseover", function(d) {		
            			tooltip.html(function()
            				{
            					return "<p><B>"+d[4]+"</p></B>"+"<p>"+d[8]+"</p>";
            				})
            			.style("left", (d3.event.pageX) + "px")
            			.style("top", (d3.event.pageY + 20) + "px")
            			.style("visibility","visible")
            			.style("opacity",0.8);
            		})	
                 .on('mouseout',function(){
    				  tooltip.style("opacity",0.0)
    				})	
                 ;
              
              var label = svg.selectAll("text")
                 .data(disease)
                 .enter()
                 .append("text")
                 .text(function(d) {
                      return d[4];
                 })
                 .attr("x", function(d) {
                      return d[0]+15;
                 })
                 .attr("y", function(d) {
                      return d[1]+6;
                 })
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "18px")
                 .style("fill", function(d) {
                    if (d[5] == "virus") return "#30ffe8";
                    if (d[5] == "bacterium") return  "#ffe551";
                    if (d[5] == "parasite") return  "#8b7cf1";
                })
                  .attr("pointer-events", "none")
                  .attr("z-index",2)
                 .on("mouseover", function(d) {		
            			tooltip.html(d[4])
            			.style("word-wrap","break-word")
            			.style("left", (d3.event.pageX) + "px")
            			.style("top", (d3.event.pageY + 20) + "px")
            			.style("opacity",1.0);
            		})	
                 .on('mouseout',function(){
    				  tooltip.style("opacity",0.0)
    				});
              //other stuff
              var choice = 0;
              
              var labelx = w*0.07;
              var labely = h*0.6;
              var labelwidth = w*0.13;
              var labelheight = h*0.27;
              var firstpaddingy = labelheight*0.15;
              var paddingx = labelwidth*0.2;
              var paddingy = labelheight*0.2;
              var circlewordpaddingx = paddingx*0.5;
              var circlewordpaddingy = paddingy*0.2;

              var titley = h*0.1;
              var titlepadding = 40;

              var overview = new Array();
              overview[0] = "We have experienced many epidemics" ;
              overview[1] = "in the past. You can explore characteristics of the";
              overview[2] =  "most common infectious diseases here." ;

              svg.append("text")
              .text("Characteristics of Epidemics")
              .attr("x",labelx)
              .attr("y",titley)
              .attr("font-family", "Avenir")
              .attr("font-size", "40px")
              .attr("fill","#FFFFFF");

              var overviewtext = svg.append("text")
              .attr("x",labelx)
              .attr("y",titley+titlepadding)
              .attr("font-family", "Avenir")
              .attr("font-size", "20px")
              .attr("fill","#FFFFFF");

              overviewtext.selectAll("tspan")
              .data(overview)
              .enter()
              .append("tspan")
              .attr("x",overviewtext.attr("x"))
              .attr("dy","2em")
              .text(function(d){
                return d;
              });
              
              //button

              button1 = svg.append("rect")
              .attr("rx",10)
              .attr("ry",10)
              .attr("x",labelx)
              .attr("y",h*0.4)
              .attr("stroke-width",2)
              .attr("stroke","white")
              .attr("width", labelwidth)
              .attr("height", labelheight/6)
              .attr("fill", "rgb(255,255,255)")
              .attr("fill-opacity",0)
              .on("click",sortByTransmission);
              button1text = svg.append("text")
              .text("Sort by Transmission")
              .attr("x",labelx+paddingx*0.4)
              .attr("y",h*0.43)
              .attr("fill","white")
              .attr("font-family", "Avenir")
              .attr("font-size", "18px")
              .on("click",sortByTransmission);
              

              button2 = svg.append("rect")
              .attr("rx",10)
              .attr("ry",10)
              .text("test")
              .attr("x",labelx)
              .attr("y",h*0.5)
              .attr("stroke-width",2)
              .attr("stroke","white")
              .attr("width", labelwidth)
              .attr("height", labelheight/6)
              .attr("fill", "rgb(255,255,255")
              .attr("fill-opacity",0)
              .on("click",sortByFatality);
               button2text = svg.append("text")
              .text("Sort by Fatality")
              .attr("x",labelx+paddingx*0.4)
              .attr("y",h*0.53)
              .attr("fill","white")
              .attr("font-family", "Avenir")
              .attr("font-size", "18px")
              .on("click",sortByFatality);


               showLabelButton = svg.append("rect")
              .attr("rx",10)
              .attr("ry",10)
              .attr("x",w*0.45)
              .attr("y",h*0.1)
              .attr("stroke-width",2)
              .attr("stroke","white")
              .attr("width", labelheight/10)
              .attr("height", labelheight/10)
              .attr("fill", "rgb(255,255,255)")
              .attr("fill-opacity",0)
              .on("click",showLabels);
              showLabelButtontext = svg.append("text")
              .text("Show Label")
              .attr("x",w*0.45+labelheight/8+10)
              .attr("y",h*0.12)
              .attr("fill","white")
              .attr("font-family", "Avenir")
              .attr("font-size", "20px");
              //////////////////////////////
              
              
              svg.append("rect")
              .attr("x",labelx)
              .attr("y",labely)
              .attr("width", labelwidth)
              .attr("height", labelheight)
              .attr("stroke","red")
              .style("stroke-dasharray", ("3, 3"))
              .attr("fill", "rgba(255, 222, 222, 0.1)");

               svg.append("text")
              .text("Pathogen Type")
              .attr("x",labelx+paddingx/2)
              .attr("y",firstpaddingy+labely)
              .attr("font-family", "Avenir")
              .attr("font-size", "21px")
              .attr("fill","#FFFFFF");

              svg.append("circle")
              .attr("cx",labelx+paddingx)
              .attr("cy",firstpaddingy+labely+paddingy)
              .attr("r",6)
              .attr("fill","#30ffe8");
              svg.append("text")
              .text("Virus")
              .attr("x",labelx+paddingx+circlewordpaddingx)
              .attr("y",firstpaddingy+labely+paddingy+circlewordpaddingy)
              .attr("font-family", "Avenir")
              .attr("font-size", "18px")
              .attr("fill","#30ffe8");

              svg.append("circle")
              .attr("cx",labelx+paddingx)
              .attr("cy",firstpaddingy+labely+paddingy*2)
              .attr("r",6)
              .attr("fill","#ffe551");
              svg.append("text")
              .text("Bacterium")
              .attr("x",labelx+paddingx+circlewordpaddingx)
              .attr("y",firstpaddingy+labely+paddingy*2+circlewordpaddingy)
              .attr("font-family", "Avenir")
              .attr("font-size", "18px")
              .attr("fill","#ffe551");

              svg.append("circle")
              .attr("cx",labelx+paddingx)
              .attr("cy",firstpaddingy+labely+paddingy*3)
              .attr("r",6)
              .attr("fill","#8b7cf1");
              svg.append("text")
              .text("Parasite")
              .attr("x",labelx+paddingx+circlewordpaddingx)
              .attr("y",firstpaddingy+labely+paddingy*3+circlewordpaddingy)
              .attr("font-family", "Avenir")
              .attr("font-size", "18px")
              .attr("fill","#8b7cf1");
              
              

                //draw coords
                var innerRadius = 100;
                var coord = new Array();
                var coordfan = new Array();
                var coordtri;
                var coordlabel = new Array();
                var coordfanlabel = new Array();

                 for (var i = 0;i<=10;i++)
                  {
                    coord[i] = svg.append("circle")
                    .attr("cx",centerx)
                    .attr("cy",centery)
                    .attr("r",innerRadius+i*radius/10)
                    .attr("pointer-events", "none")
                  	.style("z-index",1)
                    .style({
                      fill: '#f7d3d3',
                      stroke: '#ba1010', 
                      'stroke-width': 0,
                      'fill-opacity': 0
                    })
                    .style("visibility","hidden");
                    coordlabel[i] = svg.append("text")
                    .text(function()
                    {
                      return parseInt(i*10)+"%";
                    })
                    .attr("x",centerx)
                    .attr("y",centery - (innerRadius+i*radius/10))
                    .attr("font-family", "Avenir")
                    .style("visibility","hidden");
                  }
                  var transmissionmap = ["Surfaces","Airbone","Airbone Droplet","Bites","Body Fluids","Fecal-oral","Food","Sexual Contact"];
                  var arcBoundary = new Array();
                  var outerfanratio = 1/5;
                  for (var i = 0;i<=7;i++)
                  {
                    arcBoundary[i] = [];
                    arcBoundary[i][0] = Math.cos(i*Math.PI/4+Math.PI/60)*(radius+innerRadius*outerfanratio+innerRadius)+centerx;
                    arcBoundary[i][1] = Math.sin(i*Math.PI/4+Math.PI/60)*(radius+innerRadius*outerfanratio+innerRadius)+centery;
                    arcBoundary[i][2] = Math.cos((i+1)*Math.PI/4-Math.PI/60)*(radius+innerRadius*outerfanratio+innerRadius)+centerx;
                    arcBoundary[i][3] = Math.sin((i+1)*Math.PI/4-Math.PI/60)*(radius+innerRadius*outerfanratio+innerRadius)+centery;
                  }
                  coordtri = svg.selectAll("polygon")
                  .data(disease)
                  .enter()
                  .append("polygon")
                  .attr("points",function(d){
                      return (d[0])+" "+(d[1])+","+arcBoundary[d[7]][0]+" "+arcBoundary[d[7]][1]+","+arcBoundary[d[7]][2]+" "+arcBoundary[d[7]][3];
                    })
                  .style("fill-opacity",0)
                  .attr("pointer-events", "none")
                  .attr("z-index",2)
                  .style("visibility","hidden")
                  .style("fill","#8c7df0");


  			  	  var fantooltip = d3.select("body")
  				  .append("div")
  				  .attr("class","tooltip")
  				  .style("width","220px")
  				  //.style("height","220px")
  				  .style("left", 360 + "px")
            	  .style("top", 2375 + "px")
  				  .style("font-size","18px")
  				  .style("font-family", "Avenir")
  				  .style("background", "#979797")
  				  .style("border", "0px")
  				  .style("border-radius","8px")	
  				  .style("pointer-events", "none")	
  				  .style("opacity",0.8)
  				  .style("visibility","hidden");
                  for (var i = 0;i<=7;i++)
                  {
                    var arc = d3.svg.arc()
                    .innerRadius(radius+innerRadius)
                    .outerRadius(radius+innerRadius*outerfanratio+innerRadius)
                    .startAngle(i*Math.PI/4)
                    .endAngle((i+1)*Math.PI/4)
                    .padAngle(Math.PI/60);
                    coordfan[i]=svg.append("path")
                    	.attr("id",parseInt((i+6)%8))
                        .attr("transform", "translate("+centerx+","+centery+")")
                        .attr("d", arc)
                        .attr("pointer-events", "visible")
                  		.attr("z-index",2)
                  		.style("fill-opacity",0)
                        .style("visibility","hidden")
                        .style("fill","#8c7df0")
                    	.on("mouseover", function() {	
                    		var id = this.id;
            				fantooltip.html(function()
            				{
            					return "<p><B>"+transmissionmap[parseInt(id)]+"</B></p>"+
            					"<p>"+transmissiondetail[parseInt(id)]+"</p>";
            				})
            				.style("word-wrap","break-word")
            				.style("visibility","visible")
            				.style("opacity",0.8);
            			})	
                 		.on('mouseout',function(){
    				  		fantooltip.style("visibility","hidden")
    					});

                    var transx = centerx + Math.cos((i+0.5)*Math.PI/4-Math.PI/25)*(radius+innerRadius*outerfanratio+innerRadius+20);
                    var transy = centery + Math.sin((i+0.5)*Math.PI/4-Math.PI/25)*(radius+innerRadius*outerfanratio+innerRadius+20);
                    coordfanlabel[i] = svg.append("text")
                    .text(transmissionmap[i])
                    //.attr("x",centerx + Math.cos((i+0.5)*Math.PI/4)*(radius+innerRadius/2+innerRadius))
                    //.attr("y",centery + Math.sin((i+0.5)*Math.PI/4)*(radius+innerRadius/2+innerRadius))
                    .attr("transform", "translate("+transx+","+transy+") "+"rotate("+((((i+0.5)*Math.PI/4)+Math.PI/2)/Math.PI*180)+")")
                    .attr("font-family", "Avenir")
                    .attr("font-size", "20px")
                    .attr("pointer-events", "visible")
                  	.attr("z-index",2)
                    .style("fill","white")
                    .style("visibility","hidden");
                  }

                // if (csvdata[i].transmission == "surfaces") disease[i][7] = 0;
                // if (csvdata[i].transmission == "airborne") disease[i][7] =  1;
                // if (csvdata[i].transmission == "airborne droplet") disease[i][7] =  2;
                // if (csvdata[i].transmission == "bites") disease[i][7] =  3;
                // if (csvdata[i].transmission == "body fluids") disease[i][7] =  4;
                // if (csvdata[i].transmission == "fecal-oral") disease[i][7] =  5;
                // if (csvdata[i].transmission == "food") disease[i][7] =  6;
                // if (csvdata[i].transmission == "sexual contact") disease[i][7] =  7;
                  //fans

                  function showLabels()
                  {
                  	showLabelFlag *= -1;
                  	if (showLabelFlag>0)
                  	{
                  		label
                  		.transition()
                  		.duration(1000)
                  		.style("visibility","visible")
                  		.style("fill-opacity",1);
                  		showLabelButton
                  		.attr("fill-opacity",1);
                  	}
                  	else
                  	{
                  		label
                  		.transition()
                  		.duration(1000)
                  		.style("fill-opacity",0);
                  		showLabelButton
                  		.attr("fill-opacity",0);
                  	}
                  }
                // disease[i][0] = x+centerx;
                // disease[i][1] = y+centery;
                // disease[i][2] = angle;
                // disease[i][3] = r*radius;
                // disease[i][4] = csvdata[i].name;
                // disease[i][5] = csvdata[i].type;
                // disease[i][6] = csvdata[i].fatality;
                // disease[i][7] = csvdata[i].transmission;
                function sortByFatality()
                {
                  button1
                  .transition()
                  .duration(500)
                  .style("fill-opacity",0);
                  button1text
                  .transition()
                  .duration(500)
                  .attr("fill","white");
                  button2
                  .transition()
                  .duration(500)
                  .style("fill-opacity",1);
                  button2text
                  .transition()
                  .duration(500)
                  .attr("fill","black");


                  var temprand = new Array;

                  circles
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .attr("cx", function(d,i) {
                  temprand[i] = Math.random();
                  d[2] = temprand[i]*2*Math.PI;
                  d[3] = innerRadius+radius*d[6];
                  d[0] = d[3]*Math.cos(d[2])+centerx;
                  return d[0];
                  })
                  .attr("cy", function(d,i) {
                  d[2] = temprand[i]*2*Math.PI;
                  d[3] = innerRadius+radius*d[6];
                  d[1] = d[3]*Math.sin(d[2])+centery;
                  return d[1];
                  });
  
                  label
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .attr("x", function(d,i) {
                  d[2] = temprand[i]*2*Math.PI;
                  d[3] = innerRadius+radius*d[6];
                  d[0] = d[3]*Math.cos(d[2])+centerx+15;
                  return d[0];
                  })
                  .attr("y", function(d,i) {
                  d[2] = temprand[i]*2*Math.PI;
                  d[3] = innerRadius+radius*d[6];
                  d[1] = d[3]*Math.sin(d[2])+centery+6;
                  return d[1];
                  })
                  .attr("fill-opacity",0);

                  for (var i = 0;i<=10;i++)
                  {
                    coord[i]
                    .transition()
                    .duration(1000)
                    .attr("cx",centerx)
                    .attr("cy",centery)
                    .attr("r",innerRadius+i*radius/10)
                    .style({
                      fill: '#f7d3d3',
                      stroke: '#ba1010', 
                      'stroke-width': 1,
                      'fill-opacity': .02
                    })
                    .style("z-index",1)
                    .style("visibility","visible");
                   
                    coordlabel[i]
                    .transition()
                    .duration(1000)
                    .text(function()
                    {
                      return parseInt(i*10)+"%";
                    })
                    .attr("x",centerx)
                    .attr("y",centery - (innerRadius+i*radius/10))
                    .attr("font-family", "Avenir")
                    .attr("font-size", "14px")
                    .style("visibility","visible")
                    .style("fill","#FFFFFF")
                    .style("fill-opacity",0.8)
                  }
                  for (var i = 0;i<=7;i++)
                  {
                    coordfan[i]
                        .transition()
                        .duration(1000)
                        .style("visibility","hidden")
                        .style("fill","#8c7df0");
                    coordfanlabel[i]
                        .transition()
                        .duration(1000)
                        .style("visibility","hidden");
                  }
                  coordtri
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .style("visibility","hidden")
                  .attr("points",function(d,i){
                    d[0] = d[3]*Math.cos((temprand[i][0]+d[7])*Math.PI/4)+centerx;
                    d[1] = d[3]*Math.sin((temprand[i][1]+d[7])*Math.PI/4)+centery;
                    return (d[0])+" "+(d[1])+","+arcBoundary[d[7]][0]+" "+arcBoundary[d[7]][1]+","+arcBoundary[d[7]][2]+" "+arcBoundary[d[7]][3];
                  })
                  .style("fill",function(d)
                    {
                      if (d[5] == "virus") return "#30ffe8";
                      if (d[5] == "bacterium") return  "#ffe551";
                      if (d[5] == "parasite") return  "#8b7cf1";
                    });
                }
                // disease[i][0] = x+centerx;
                // disease[i][1] = y+centery;
                // disease[i][2] = angle;
                // disease[i][3] = r*radius;
                // disease[i][4] = csvdata[i].name;
                // disease[i][5] = csvdata[i].type;
                // disease[i][6] = csvdata[i].fatality;
                // disease[i][7] = csvdata[i].transmission;
                function sortByTransmission()
                {
                  button1
                  .transition()
                  .duration(500)
                  .style("fill-opacity",1);
                  button1text
                  .transition()
                  .duration(500)
                  .attr("fill","black");
                  button2
                  .transition()
                  .duration(500)
                  .style("fill-opacity",0);
                  button2text
                  .transition()
                  .duration(500)
                  .attr("fill","white");

                  var temprand = new Array;
                  for (var i = 0;i<csvdata.length;i++)
                    temprand[i] = [];
                  circles
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .attr("cx", function(d,i) {
                    temprand[i][0] = Math.random();
                  d[2] = (temprand[i][0]+d[7])*Math.PI/4;
                  d[0] = d[3]*Math.cos(d[2])+centerx;
                  return d[0];
                  })
                  .attr("cy", function(d,i) {
                    temprand[i][1] = Math.random();
                  d[2] = (temprand[i][0]+d[7])*Math.PI/4;
                  d[1] = d[3]*Math.sin(d[2])+centery;
                  return d[1];
                  });
  
                  label
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .attr("x", function(d,i) {
                  d[2] = (temprand[i][0]+d[7])*Math.PI/4;
                  d[0] = d[3]*Math.cos(d[2])+centerx+15;
                  return d[0];
                  })
                  .attr("y", function(d,i) {
                  d[2] = (temprand[i][0]+d[7])*Math.PI/4;
                  d[1] = d[3]*Math.sin(d[2])+centery+6;
                  return d[1];
                  })
                  .style("fill-opacity",0);

                  coordtri
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .attr("points",function(d,i){
                    d[0] = d[3]*Math.cos((temprand[i][0]+d[7])*Math.PI/4)+centerx;
                    d[1] = d[3]*Math.sin((temprand[i][0]+d[7])*Math.PI/4)+centery;
                    return (d[0])+" "+(d[1])+","+arcBoundary[d[7]][0]+" "+arcBoundary[d[7]][1]+","+arcBoundary[d[7]][2]+" "+arcBoundary[d[7]][3];
                  })
                  .style("visibility","visible")
                  .style("fill-opacity",0.1)
                  .style("fill",function(d)
                    {
                      if (d[5] == "virus") return "#30ffe8";
                      if (d[5] == "bacterium") return  "#ffe551";
                      if (d[5] == "parasite") return  "#8b7cf1";
                    });
                  var fancount = new Array();
                  for (var i = 0;i<=7;i++)
                  {
                    coordfan[i]
                        .transition()
                        .duration(1000)
                        .style("fill-opacity",0.8)
                        .style("visibility","visible")
                        .style("fill",function()
                        {
                          var r = Math.random();
                          if (r<0.33) return "#30ffe8";
                          if (r>0.33 && r<0.66) return "#ffe551";
                          else return "#8b7cf1";
                        });
                    coordfanlabel[i]
                    .transition()
                    .duration(1000)
                    .style("visibility","visible");
                  }
                  for (var i = 0;i<=10;i++)
                  {
                    coord[i]
                    .transition()
                    .duration(1000)
                    .attr("cx",centerx)
                    .attr("cy",centery)
                    .attr("r",innerRadius+i*radius/10)
                    .style({
                      fill: '#f7d3d3',
                      stroke: '#ba1010', 
                      'stroke-width': 0,
                      'fill-opacity': 0
                    })
                    .style("visibility","hidden");;
                    coordlabel[i]
                    .transition()
                    .duration(1000)
                    .text(function()
                    {
                      return parseInt(i*10)+"%";
                    })
                    .attr("x",centerx)
                    .attr("y",centery - (innerRadius+i*radius/10))
                    .attr("font-family", "Avenir")
                    .attr("font-size", "15px")
                    .style("visibility","hidden")
                    .style("fill","#FFFFFF")
                  }
                }
                
             });
             