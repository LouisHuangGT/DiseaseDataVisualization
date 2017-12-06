var w = 1400;
var h = 800;
var svg = d3.select("body")
                          .append("svg")
                          .attr("width",w)
                          .attr("height", h);
var diseasepoint;
var diseaselabel;
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

              var showdiseaselabelFlag = 1;

              var radius = h*0.22;
              var centerx = w*2/3;
              var centery = h/2
              var disease = new Array();
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
  			var fantooltip = d3.select("body")
  				  .append("div")
  				  .attr("class","tooltip")
  				  .style("width","220px")
  				  //.style("height","220px")
  				  .style("left", (w*0.25) + "px")
            	  .style("top",(2.22*h) + "px")
  				  .style("font-size","14px")
  				  .style("font-family", "Avenir")
  				  .style("background", "#979797")
  				  .style("border", "0px")
  				  .style("border-radius","8px")	
  				  .style("pointer-events", "none")	
  				  .style("opacity",0.8)
  				  .style("visibility","hidden");
              // Circle Vis
 
            	
              diseasepoint = svg.selectAll("circle")
                 .data(disease)
                 .enter()
                 .append("circle")
                 .attr("cx", function(d) {

                      return centerx;
                 })
                 .attr("cy", function(d) {
                      return centery;
                 })
                 .attr("r", function(d) {
                      return 0;
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
            					return "<p><B>"+d[4]+"</p></B>"
                                     + "<p> Fatality Rate: "+(d[6]*100)+"%<p>"
                                     + "<p>"+d[8]+"</p>";
            				})
            			.style("left", (d3.event.pageX) + "px")
            			.style("top", (d3.event.pageY + 20) + "px")
            			.style("visibility","visible")
            			.style("opacity",0.8);
            		})	
                 .on('mouseout',function(){
    				  tooltip.style("opacity",0.0)
    				});
                 
              
              diseaselabel = svg.selectAll("text")
                 .data(disease)
                 .enter()
                 .append("text")
                 .text(function(d) {
                      return d[4];
                 })
                 .attr("x", function(d) {
                      return centerx;
                 })
                 .attr("y", function(d) {
                      return centery;
                 })
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "14px")
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

              			

				/*   window.onscroll = function()
				   {
					  
				      console.log("Calling this function HUANG");
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
				    }*/

                   //other stuff
              var choice = 0;
              
              var diseaselabelx = w*0.07;
              var diseaselabely = h*0.6;
              var diseaselabelwidth = w*0.115;
              var diseaselabelheight = h*0.25;
              var firstpaddingy = diseaselabelheight*0.15;
              var paddingx = diseaselabelwidth*0.15;
              var paddingy = diseaselabelheight*0.2;
              var circlewordpaddingx = paddingx*0.5;
              var circlewordpaddingy = paddingy*0.2;

              var titley = h*0.17;
              var titlepadding = 40;

              var overview = new Array();
              overview[0] = "We have experienced many epidemics" ;
              overview[1] = "in the past. You can explore characteristics of the";
              overview[2] =  "most common infectious diseases here." ;

              svg.append("text")
              .text("CHARACTERISTICS OF EPIDEMICS")
              .attr("x",diseaselabelx)
              .attr("y",titley)
              .attr("font-family", "Avenir")
              .attr("font-size", "24px")
              .attr("fill","#FFFFFF");

              // var overviewtext = svg.append("text")
              // .attr("x",diseaselabelx)
              // .attr("y",titley+titlepadding)
              // .attr("font-family", "Avenir")
              // .attr("font-size", "20px")
              // .attr("fill","#FFFFFF");

              // overviewtext.selectAll("tspan")
              // .data(overview)
              // .enter()
              // .append("tspan")
              // .attr("x",overviewtext.attr("x"))
              // .attr("dy","2em")
              // .text(function(d){
              //   return d;
              // });
              
              //button

              button1 = svg.append("rect")
              .attr("rx",10)
              .attr("ry",10)
              .attr("x",diseaselabelx)
              .attr("y","247px")
              .attr("stroke-width",2)
              .attr("stroke","white")
              .attr("width", diseaselabelwidth*1.3)
              .attr("height", diseaselabelheight/6)
              .attr("fill", "rgb(255,255,255)")
              .attr("fill-opacity",0)
              .on("click",sortByFatality)
              .on("mouseover",function()
              	{
                  d3.select(this).style("cursor", "pointer");
              	})
              .on("mouseout",function()
              	{
              		d3.select(this).style("cursor", "default");
              	});
              button1text = svg.append("text")

              .text("Show by case fatality rate")
              .attr("x",diseaselabelx+paddingx*0.95)
              .attr("y","268px")
              .attr("fill","white")
              .attr("font-family", "Avenir")
              .attr("font-size", "14px")
              .on("click",sortByFatality)
              .on("mouseover",function()
              	{
                  d3.select(this).style("cursor", "pointer");
              	})
              .on("mouseout",function()
              	{
              		d3.select(this).style("cursor", "default");
              	});;
              

              button2 = svg.append("rect")
              .attr("rx",10)
              .attr("ry",10)
              .text("test")
              .attr("x",diseaselabelx)
              .attr("y","330px")
              .attr("stroke-width",2)
              .attr("stroke","white")
              .attr("width", diseaselabelwidth*1.3)
              .attr("height", diseaselabelheight/6)
              .attr("fill", "rgb(255,255,255")
              .attr("fill-opacity",0)
              .on("click",sortByTransmission)
              .on("mouseover",function()
              	{
                  d3.select(this).style("cursor", "pointer");
              	})
              .on("mouseout",function()
              	{
              		d3.select(this).style("cursor", "default");
              	});
               button2text = svg.append("text")
              .text("Show by transmission modes")
              .attr("x",diseaselabelx+paddingx*0.4)
              .attr("y","350px")
              .attr("fill","white")
              .attr("font-family", "Avenir")
              .attr("font-size", "14px")
              .on("click",sortByTransmission)
              .on("mouseover",function()
              	{
                  d3.select(this).style("cursor", "pointer");
              	})
              .on("mouseout",function()
              	{
              		d3.select(this).style("cursor", "default");
              	});


               showdiseaselabelButton = svg.append("rect")
              .attr("rx",10)
              .attr("ry",10)
              .attr("x",diseaselabelx)
              .attr("y","175px")
              .attr("stroke-width",2)
              .attr("stroke","white")
              .attr("width", diseaselabelheight/10)
              .attr("height", diseaselabelheight/10)
              .attr("fill", "rgb(255,255,255)")
              .attr("fill-opacity",1)
              .on("click",showdiseaselabels)
              .on("mouseover",function()
              	{
                  d3.select(this).style("cursor", "pointer");
              	})
              .on("mouseout",function()
              	{
              		d3.select(this).style("cursor", "default");
              	});
              showdiseaselabelButtontext = svg.append("text")
              .text("Show labels")
              .attr("x",diseaselabelx+diseaselabelheight/8+10)
              .attr("y","190px")
              .attr("fill","white")
              .attr("font-family", "Avenir")
              .attr("font-size", "14px");
              //////////////////////////////
              
              
              svg.append("rect")
              .attr("x",diseaselabelx)
              .attr("y",diseaselabely)
              .attr("width", diseaselabelwidth)
              .attr("height", diseaselabelheight)
              .attr("stroke","red")
              .style("stroke-dasharray", ("3, 3"))
              .attr("fill", "rgba(255, 222, 222, 0.1)");

               svg.append("text")
              .text("Pathogen Type")
              .attr("x",diseaselabelx+paddingx)
              .attr("y",firstpaddingy+diseaselabely)
              .attr("font-family", "Avenir")
              .attr("font-size", "14px")
              .attr("fill","#FFFFFF");

              svg.append("circle")
              .attr("cx",diseaselabelx+paddingx)
              .attr("cy",firstpaddingy+diseaselabely+paddingy)
              .attr("r",6)
              .attr("fill","#30ffe8");
              svg.append("text")
              .text("Virus")
              .attr("x",diseaselabelx+paddingx+circlewordpaddingx)
              .attr("y",firstpaddingy+diseaselabely+paddingy+circlewordpaddingy)
              .attr("font-family", "Avenir")
              .attr("font-size", "14px")
              .attr("fill","#30ffe8");

              svg.append("circle")
              .attr("cx",diseaselabelx+paddingx)
              .attr("cy",firstpaddingy+diseaselabely+paddingy*2)
              .attr("r",6)
              .attr("fill","#ffe551");
              svg.append("text")
              .text("Bacterium")
              .attr("x",diseaselabelx+paddingx+circlewordpaddingx)
              .attr("y",firstpaddingy+diseaselabely+paddingy*2+circlewordpaddingy)
              .attr("font-family", "Avenir")
              .attr("font-size", "14px")
              .attr("fill","#ffe551");

              svg.append("circle")
              .attr("cx",diseaselabelx+paddingx)
              .attr("cy",firstpaddingy+diseaselabely+paddingy*3)
              .attr("r",6)
              .attr("fill","#8b7cf1");
              svg.append("text")
              .text("Parasite")
              .attr("x",diseaselabelx+paddingx+circlewordpaddingx)
              .attr("y",firstpaddingy+diseaselabely+paddingy*3+circlewordpaddingy)
              .attr("font-family", "Avenir")
              .attr("font-size", "14px")
              .attr("fill","#8b7cf1");
              
              

                //draw coords
                var innerRadius = 100;
                var coord = new Array();
                var coordfan = new Array();
                var coordtri;
                var coorddiseaselabel = new Array();
                var coordfandiseaselabel = new Array();

                 for (var i = 0;i<=10;i++)
                  {
                    coord[i] = svg.append("circle")
                    .attr("cx",centerx)
                    .attr("cy",centery)
                    .attr("r",0)
                    .attr("pointer-events", "none")
                  	.style("z-index",1)
                    .style({
                      fill: '#f7d3d3',
                      stroke: '#ba1010', 
                      'stroke-width': 0,
                      'fill-opacity': 0
                    })
                    .style("visibility","hidden");
                    coorddiseaselabel[i] = svg.append("text")
                    .text(function()
                    {
                      return parseInt(i*10)+"%";
                    })
                    .attr("x",centerx)
                    .attr("y",centery - (innerRadius+i*radius/10))
                    .attr("font-size","14px")
                    .attr("fill","white")
                    .attr("fill-opactiy",0)
                    .attr("font-family", "Avenir")
                    .style("visibility","hidden");
                  }
                  var transmissionmap = ["Surfaces","Airbone","Airbone Droplet","Bites","Body Fluids","Fecal-oral","Food","Sexual Contact"];
                  var arcBoundary = new Array();
                  var outerfanratio = 4/15;
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
                  .attr("pointer-events", "visible")
                  .attr("z-index",2)
                  .style("visibility","hidden")
                  .style("fill","#8c7df0")
                   .on("mouseover", function(d) {
                       var id = (Math.floor(d[2]/(Math.PI/4))+2)%8;
                       
                       fantooltip.html(function()
                                       {
                                       return "<p><B>"+transmissionmap[parseInt((id+6)%8)]+"</B></p>"+
                                       "<p>"+transmissiondetail[parseInt((id+6)%8)]+"</p>";
                                       })
                       .style("word-wrap","break-word")
                       .style("visibility","visible")
                       .style("opacity",0.8);

                       d3.select(this).style("fill-opacity",0.6);
                       
                       coordfan[id]
                       .style("fill","#f16565")
                       .style("fill-opacity",1);
                       
                       coordfandiseaselabel[(id+6)%8]
                       .style("fill","#f16565");
                       })
                   .on('mouseout',function(d){
                       var id = (Math.floor(d[2]/(Math.PI/4))+2)%8;
                       fantooltip.style("visibility","hidden");
                       
                       
                       d3.select(this).style("fill-opacity",0.1);
                       
                        coordfan[id]
                       .style("fill","black")
                       .style("fill-opacity",1);
                       
                       coordfandiseaselabel[(id+6)%8]
                       .style("fill","rgba(255,255,255,0.6)");
                       });

                  for (var i = 0;i<=7;i++)
                   {
                   
                   var transx = centerx + Math.cos((i+0.5)*Math.PI/4-Math.PI/25)*(radius+innerRadius*outerfanratio+innerRadius+20);
                   var transy = centery + Math.sin((i+0.5)*Math.PI/4-Math.PI/25)*(radius+innerRadius*outerfanratio+innerRadius+20);
                   
                   coordfandiseaselabel[i] = svg.append("text")
                   .text(transmissionmap[i])
                   .attr("transform", "translate("+transx+","+transy+") "+"rotate("+((((i+0.5)*Math.PI/4)+Math.PI/2)/Math.PI*180)+")")
                   .attr("font-family", "Avenir")
                   .attr("font-size", "14px")
                   .attr("pointer-events", "visible")
                   .attr("z-index",2)
                   .style("fill","rgba(255,255,255,0.6)")
                   .style("visibility","hidden");
                   
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
                        .style("fill","black")
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
                            
                            d3.select(this)
                            .style("fill","#f16565")
                            .style("fill-opacity",1);
                            
                            coordfandiseaselabel[id]
                            .style("fill","#f16565");
            			})	
                 		.on('mouseout',function(){
                            fantooltip.style("visibility","hidden");
                            coordfandiseaselabel[this.id]
                            .style("fill","rgba(255,255,255,0.6)");
                            d3.select(this)
                            .style("fill","black")
                            .style("fill-opacity",1);
    					});

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

                  function showdiseaselabels()
                  {
                  	showdiseaselabelFlag *= -1;
                  	if (showdiseaselabelFlag>0)
                  	{
                  		diseaselabel
                  		.transition()
                  		.duration(1000)
                  		.style("visibility","visible")
                  		.style("fill-opacity",1);
                  		showdiseaselabelButton
                  		.attr("fill-opacity",1);
                  	}
                  	else
                  	{
                  		diseaselabel
                  		.transition()
                  		.duration(1000)
                  		.style("fill-opacity",0);
                  		showdiseaselabelButton
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
                  button2
                  .transition()
                  .duration(500)
                  .style("fill-opacity",0);
                  button2text
                  .transition()
                  .duration(500)
                  .attr("fill","white");
                  button1
                  .transition()
                  .duration(500)
                  .style("fill-opacity",1);
                  button1text
                  .transition()
                  .duration(500)
                  .attr("fill","black");
                   
                  var temprand = new Array();

                  diseasepoint
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .attr("cx", function(d,i) {
                  temprand[i] = Math.random();
                  d[2] = temprand[i]*2*Math.PI;
                  d[3] = innerRadius+radius*d[6];
                  d[1] = d[3]*Math.sin(d[2])+centery;
                  d[0] = d[3]*Math.cos(d[2])+centerx;
                  return d[0];
                  })
                  .attr("cy", function(d,i) {
                  d[3] = innerRadius+radius*d[6];
                  d[0] = d[3]*Math.cos(d[2])+centerx;
                  d[1] = d[3]*Math.sin(d[2])+centery;
                  return d[1];
                  });
  
                  diseaselabel
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .attr("x", function(d,i) {
                  d[2] = temprand[i]*2*Math.PI;
                  d[3] = innerRadius+radius*d[6];
                  d[0] = d[3]*Math.cos(d[2])+centerx;
                  return d[0]+15;
                  })
                  .attr("y", function(d,i) {
                  d[2] = temprand[i]*2*Math.PI;
                  d[3] = innerRadius+radius*d[6];
                  d[1] = d[3]*Math.sin(d[2])+centery;
                  return d[1]+6;
                  })
                  .attr("fill-opacity",1);

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
                      stroke: "'#ba1010'", 
                      'stroke-width': 0.5,
                      'fill-opacity': .02
                    })
                    .style("z-index",1)
                    .style("visibility","visible");
                   
                    coorddiseaselabel[i]
                    .transition()
                    .duration(1000)
                    .attr("fill-opacity",0.8)
                    .style("visibility","visible")
                  }
                  for (var i = 0;i<=7;i++)
                  {
                    coordfan[i]
                        .style("visibility","hidden")
                        .style("fill","black");
                    coordfandiseaselabel[i]
                        .transition()
                        .duration(1000)
                        .style("visibility","hidden");
                  }
                  coordtri
                  .transition()
                  .duration(1000)
                  .style("visibility","hidden");
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

                  button2
                  .transition()
                  .duration(500)
                  .style("fill-opacity",1);
                  button2text
                  .transition()
                  .duration(500)
                  .attr("fill","black");
                  button1
                  .transition()
                  .duration(500)
                  .style("fill-opacity",0);
                  button1text
                  .transition()
                  .duration(500)
                  .attr("fill","white");

                  var temprand = new Array;
                  for (var i = 0;i<csvdata.length;i++)
                    temprand[i] = [];
                  diseasepoint
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
                  d[2] = (temprand[i][0]+d[7])*Math.PI/4;
                  d[1] = d[3]*Math.sin(d[2])+centery;
                  return d[1];
                  });
  
                  diseaselabel
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
                  .attr("fill-opacity",1);

                  coordtri
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .attr("points",function(d,i){
                    d[0] = d[3]*Math.cos((temprand[i][0]+d[7])*Math.PI/4)+centerx;
                    d[1] = d[3]*Math.sin((temprand[i][0]+d[7])*Math.PI/4)+centery;
                    return (d[0])+" "+(d[1])+","+arcBoundary[d[7]][0]+" "+arcBoundary[d[7]][1]+","+arcBoundary[d[7]][2]+" "+arcBoundary[d[7]][3];
                  })
                  .attr("pointer-events", "visible")
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
                        .style("fill-opacity",1)
                        .style("visibility","visible")
                        .style("fill","black");
                    coordfandiseaselabel[i]
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
                    coorddiseaselabel[i]
                    .transition()
                    .duration(1000)
                   .style("visibility","hidden");
                  }
                }
                
             });
             
