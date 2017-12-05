var w = 1400;
var h = 800;
var svg = d3.select("body")
                          .append("svg")
                          .attr("width",w)
                          .attr("height", h);

 var datasource = "data/historical epidemics.csv";
            d3.csv(datasource,function(error,csvdata){ 
              var transmissiondetail = new Array();
                    transmissiondetail[0] = [];
                    transmissiondetail[0][0] = ["Diseases that can be transmitted"];
                    transmissiondetail[0][1] = ["by direct contact are called contagious"];
                    transmissiondetail[1] = [];
                    transmissiondetail[1][0] = ["Airborne transmission refers to infectious "];
                    transmissiondetail[1][1] = ["agents that are spread via droplet nuclei "];
                    transmissiondetail[1][2] = ["(residue from evaporated droplets) containing "];
                    transmissiondetail[1][3] = ["infective microorganisms."];
                    transmissiondetail[2] = [];
                    transmissiondetail[2][0] = ["Droplet transmission occurs when respiratory "];
                    transmissiondetail[2][1] = ["droplets generated via coughing, sneezing or "];
                    transmissiondetail[2][2] = ["talking contact susceptible mucosal surfaces,"]; 
                    transmissiondetail[2][3] = ["such as the eyes, nose or mouth."];
                    transmissiondetail[3] = [];
                    transmissiondetail[3][0] = ["Diseases that are transmitted primarily by oral "];
                    transmissiondetail[3][1] = ["means may be caught through direct oral contact "];
                    transmissiondetail[3][2] = ["such as kissing, or by indirect contact such "];
                    transmissiondetail[3][3] = ["as by sharing a drinking glass or a cigarette."];
                    transmissiondetail[4] = [];
                    transmissiondetail[4][0] = ["Transmission due to medical procedures, such as "];
                    transmissiondetail[4][1] = ["touching a wound, an injection or transplantation "];
                    transmissiondetail[4][1] = ["of infected material. "];
                    transmissiondetail[5] = [];
                    transmissiondetail[5][0] = ["In the fecal-oral route, pathogens in fecal particles"];
                    transmissiondetail[5][1] = ["pass from one person to the mouth of another person. "];
                    transmissiondetail[6] = [];
                    transmissiondetail[6][0] = ["A vector is an organism that does not cause disease "];
                    transmissiondetail[6][1] = ["itself but that transmits infection by conveying pathogens "];
                    transmissiondetail[6][2] = ["from one host to another."];
                    transmissiondetail[7] = [];
                    transmissiondetail[7][0] = ["Sexually transmitted diseases such as HIV and hepatitis B "];
                    transmissiondetail[7][1] = [" are thought to not normally be transmitted through mouth-to-mouth "];
                    transmissiondetail[7][2] = ["contact, although it is possible to transmit some STDs between the "];
                    transmissiondetail[7][3] = ["genitals and the mouth, during oral sex."];


              var radius = h*0.17;
              var centerx = w*2/3;
              var centery = h/2
              var disease = new Array();
              console.log(csvdata.length);
              for (var i = 0;i<csvdata.length;i++)
              {
                var angle = Math.random()*Math.PI*2 ;
                var r = Math.random();
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

              }
              console.log(disease);

              svg.append("rect")
              .attr("width", w)
              .attr("height", h)
              .attr("fill", "black");

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
                      return 15;
                 })
                 .style("fill", function(d) {
                    if (d[5] == "virus")  return "#30ffe8";
                    if (d[5] == "bacterium") return  "#ffe551";
                    if (d[5] == "parasite") return  "#8b7cf1";
                    });
              
              var label = svg.selectAll("text")
                 .data(disease)
                 .enter()
                 .append("text")
                 .text(function(d) {
                      return d[4];
                 })
                 .attr("x", function(d) {
                      return d[0]+25;
                 })
                 .attr("y", function(d) {
                      return d[1]+5;
                 })
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "18px")
                 .style("fill", function(d) {
                    if (d[5] == "virus") return "#30ffe8";
                    if (d[5] == "bacterium") return  "#ffe551";
                    if (d[5] == "parasite") return  "#8b7cf1";
                });
              //other stuff
              var choice = 0;
              
              var labelx = w*0.07;
              var labely = h*0.6;
              var labelwidth = w*0.15;
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
              .attr("font-family", "sans-serif")
              .attr("font-size", "40px")
              .attr("fill","#FFFFFF");

              var overviewtext = svg.append("text")
              .attr("x",labelx)
              .attr("y",titley+titlepadding)
              .attr("font-family", "sans-serif")
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

              svg.append("rect")
              .attr("rx",10)
              .attr("ry",10)
              .attr("x",labelx)
              .attr("y",h*0.4)
              .attr("width", labelwidth)
              .attr("height", labelheight/6)
              .attr("fill", "rgba(255,255,255,1)")
              .on("click",sortByTransmission);

              svg.append("text")
              .text("Sort by Transmission")
              .attr("x",labelx+paddingx*0.5)
              .attr("y",h*0.43)
              .attr("fill","black")
              .attr("font-family", "sans-serif")
              .attr("font-size", "18px")
              .on("click",sortByTransmission);
              

              svg.append("rect")
              .attr("rx",10)
              .attr("ry",10)
              .text("test")
              .attr("x",labelx)
              .attr("y",h*0.5)
              .attr("width", labelwidth)
              .attr("height", labelheight/6)
              .attr("fill", "rgba(255,255,255,1)")
              .on("click",sortByFatality);
               svg.append("text")
              .text("Sort by Fatality")
              .attr("x",labelx+paddingx*0.5)
              .attr("y",h*0.53)
              .attr("fill","black")
              .attr("font-family", "sans-serif")
              .attr("font-size", "18px")
              .on("click",sortByFatality);

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
              .attr("font-family", "sans-serif")
              .attr("font-size", "22px")
              .attr("fill","#FFFFFF");

              svg.append("circle")
              .attr("cx",labelx+paddingx)
              .attr("cy",firstpaddingy+labely+paddingy)
              .attr("r",10)
              .attr("fill","#30ffe8");
              svg.append("text")
              .text("Virus")
              .attr("x",labelx+paddingx+circlewordpaddingx)
              .attr("y",firstpaddingy+labely+paddingy+circlewordpaddingy)
              .attr("font-family", "sans-serif")
              .attr("font-size", "24px")
              .attr("fill","#30ffe8");

              svg.append("circle")
              .attr("cx",labelx+paddingx)
              .attr("cy",firstpaddingy+labely+paddingy*2)
              .attr("r",10)
              .attr("fill","#ffe551");
              svg.append("text")
              .text("Bacterium")
              .attr("x",labelx+paddingx+circlewordpaddingx)
              .attr("y",firstpaddingy+labely+paddingy*2+circlewordpaddingy)
              .attr("font-family", "sans-serif")
              .attr("font-size", "24px")
              .attr("fill","#ffe551");

              svg.append("circle")
              .attr("cx",labelx+paddingx)
              .attr("cy",firstpaddingy+labely+paddingy*3)
              .attr("r",10)
              .attr("fill","#8b7cf1");
              svg.append("text")
              .text("Parasite")
              .attr("x",labelx+paddingx+circlewordpaddingx)
              .attr("y",firstpaddingy+labely+paddingy*3+circlewordpaddingy)
              .attr("font-family", "sans-serif")
              .attr("font-size", "24px")
              .attr("fill","#8b7cf1");
              
              

                //draw coords
                var innerRadius = 150;
                var coord = new Array();
                var coordfan = new Array();
                var coordtri;
                var coordlabel = new Array();
                var coordfanlabel = new Array();
                var detailbox;
                detailbox = svg.append("rect")
                .attr("x",labelx*2)
                .attr("y",labely)
                .attr("width", labelwidth)
                .attr("height", labelheight)
                .attr("fill", "rgb(255, 222, 222)")
                .attr("fill-opacity", 0);
                detail = svg.append("text")
                .attr("x",labelx*2+paddingx/2)
                .attr("y",firstpaddingy+labely)
                .attr("font-family", "sans-serif")
                .attr("font-size", "26px")
                .attr("fill","#FFFFFF")
                .attr("fill-opacity",0);

                 for (var i = 0;i<=10;i++)
                  {
                    coord[i] = svg.append("circle")
                    .attr("cx",centerx)
                    .attr("cy",centery)
                    .attr("r",innerRadius+i*radius/10)
                    .style({
                      fill: '#f7d3d3',
                      stroke: '#ba1010', 
                      'stroke-width': 0,
                      'fill-opacity': 0
                    });
                    coordlabel[i] = svg.append("text")
                    .text(function()
                    {
                      return parseInt(i*10)+"%";
                    })
                    .attr("x",centerx)
                    .attr("y",centery - (innerRadius+i*radius/10))
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "15px")
                    .style("fill-opacity",0);
                  }
                  var transmissionmap = ["surfaces","airbone","airbone droplet","bites","body fluids","fecal-oral","food","sexual contact"];
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
                  .style("fill-opacity",0.0)
                  .style("fill","#8c7df0");
                  for (var i = 0;i<=7;i++)
                  {
                    var arc = d3.svg.arc()
                    .innerRadius(radius+innerRadius)
                    .outerRadius(radius+innerRadius*outerfanratio+innerRadius)
                    .startAngle(i*Math.PI/4)
                    .endAngle((i+1)*Math.PI/4)
                    .padAngle(Math.PI/60);
                    coordfan[i]=svg.append("path")
                        .attr("transform", "translate("+centerx+","+centery+")")
                        .attr("d", arc)
                        .style("fill-opacity",0)
                        .style("fill","#8c7df0");

                    var transx = centerx + Math.cos((i+0.5)*Math.PI/4-Math.PI/25)*(radius+innerRadius*outerfanratio+innerRadius+40);
                    var transy = centery + Math.sin((i+0.5)*Math.PI/4-Math.PI/25)*(radius+innerRadius*outerfanratio+innerRadius+40);
                    coordfanlabel[i] = svg.append("text")
                    .text(transmissionmap[i])
                    //.attr("x",centerx + Math.cos((i+0.5)*Math.PI/4)*(radius+innerRadius/2+innerRadius))
                    //.attr("y",centery + Math.sin((i+0.5)*Math.PI/4)*(radius+innerRadius/2+innerRadius))
                    .attr("transform", "translate("+transx+","+transy+") "+"rotate("+((((i+0.5)*Math.PI/4)+Math.PI/2)/Math.PI*180)+")")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "25px")
                    .style("fill","white")
                    .style("fill-opacity",0);
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
                  .style("fill-opacity",1)
                  .attr("x", function(d,i) {
                  d[2] = temprand[i]*2*Math.PI;
                  d[3] = innerRadius+radius*d[6];
                  d[0] = d[3]*Math.cos(d[2])+centerx+25;
                  return d[0];
                  })
                  .attr("y", function(d,i) {
                  d[2] = temprand[i]*2*Math.PI;
                  d[3] = innerRadius+radius*d[6];
                  d[1] = d[3]*Math.sin(d[2])+centery+5;
                  return d[1];
                  });

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
                    });
                    coordlabel[i]
                    .transition()
                    .duration(1000)
                    .text(function()
                    {
                      return parseInt(i*10)+"%";
                    })
                    .attr("x",centerx)
                    .attr("y",centery - (innerRadius+i*radius/10))
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "15px")
                    .style("fill-opacity",1)
                    .style("fill","#FFFFFF")
                  }
                  for (var i = 0;i<=7;i++)
                  {
                    coordfan[i]
                        .transition()
                        .duration(1000)
                        .style("fill-opacity",0)
                        .style("fill","#8c7df0");
                    coordfanlabel[i]
                        .transition()
                        .duration(1000)
                        .style("fill-opacity",0)
                  }
                  coordtri
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .style("fill-opacity",0)
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
                  .style("fill-opacity",1)
                  .attr("x", function(d,i) {
                  d[2] = (temprand[i][0]+d[7])*Math.PI/4;
                  d[0] = d[3]*Math.cos(d[2])+centerx+25;
                  return d[0];
                  })
                  .attr("y", function(d,i) {
                  d[2] = (temprand[i][0]+d[7])*Math.PI/4;
                  d[1] = d[3]*Math.sin(d[2])+centery+5;
                  return d[1];
                  });

                  coordtri
                  .data(disease)
                  .transition()
                  .duration(1000)
                  .attr("points",function(d,i){
                    d[0] = d[3]*Math.cos((temprand[i][0]+d[7])*Math.PI/4)+centerx;
                    d[1] = d[3]*Math.sin((temprand[i][0]+d[7])*Math.PI/4)+centery;
                    return (d[0])+" "+(d[1])+","+arcBoundary[d[7]][0]+" "+arcBoundary[d[7]][1]+","+arcBoundary[d[7]][2]+" "+arcBoundary[d[7]][3];
                  })
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
                    .style("fill-opacity",1)
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
                    });
                    coordlabel[i]
                    .transition()
                    .duration(1000)
                    .text(function()
                    {
                      return parseInt(i*10)+"%";
                    })
                    .attr("x",centerx)
                    .attr("y",centery - (innerRadius+i*radius/10))
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "15px")
                    .style("fill-opacity",0)
                    .style("fill","#FFFFFF")
                  }
                }
                
             });
             