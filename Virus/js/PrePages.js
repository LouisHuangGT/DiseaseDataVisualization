var jsRects = [
   { "px": 100, "py": 650,"label" : "Europe"},
   { "px": 250, "py": 650,"label" : "Asia"},
  { "px": 400, "py": 650,"label" : "N-America"},
  { "px": 550, "py": 650,"label" : "S-America"},
  { "px": 700, "py": 650,"label" : "Africa"},
  { "px": 850, "py": 650,"label" : "Australia"},
];
  
var jsTexts = [
   { "px": 200, "py": 580,"v" :50000,"start" : 0},
   { "px": 600, "py": 580,"v" : 15000000,"start" : 0},
  { "px": 1100, "py": 580,"v" : 13000000,"start" : 0}
];
  
  /*var text = svg.select(".labels").selectAll("text")
    .data(pie(data), key);

  text.enter()
    .append("text")
    .attr("dy", ".35em")
      .style("fill","#FFFFFF")
    .text(function(d) {
      return d.data.label;
    });*/
  
 /*var jsonCircles = [
  { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
   { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
   { "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];
   
 */
 var firstSvg =  d3.select("body").append("svg")
                                     .attr("width", 1440)
                                     .attr("height", 800);

 firstSvg.append("image")
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", "1440")
            .attr("height", "800")
          .attr("xlink:href", "image/home2.png");
  
var texts1 = firstSvg.selectAll("text")
                        .data(jsTexts);

var animeTime = 1000;
var numbers = new Array();
  numbers[0] = 0;
  numbers[1] = 0;
  numbers[2] = 0;
  
var max_num = new Array();
  max_num[0] = 50000;
  max_num[1] = 15000000;
  max_num[2] = 13000000;

var text_number = new Array();
for(var i = 0; i < numbers.length; i++)
{
  text_number[i] = firstSvg.append("text")
  .attr("x",jsTexts[i].px)
    .attr("y",jsTexts[i].py)
    .text(numbers[i])
    .style("fill","white")
  .style("font-size","45");
  
}
//var a = 0;
function numberChange()
{
  
 for(var i = 0; i < numbers.length; i++)
 {
  var delta = max_num[i] / (animeTime / 10);
  if(numbers[i] < max_num[i])
  numbers[i]+= delta;
  else
  numbers[i]= max_num[i];
   
   var numberText = toThousands(numbers[i]);
   d3.select(text_number[i][0][0]).text(numberText);
 }
  //console.log(a++); 
}
  
function toThousands(num) {  
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');  
}  
setInterval(numberChange,10); 
  
  
/*texts1.enter().append("text")
  .attr("x",function (d) { return d.px; })
    .attr("y",function (d) { return  d.py; })
    .text(function(d) {return d.v;})
    .style("fill","white")
  .style("font-size","45");*/
  
  
  
  
 var svgContainer = d3.select("body").append("svg")
                                     .attr("width", 1500)
                                     .attr("height", 1000);
  

  
svgContainer.append("image")
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", "1440")
            .attr("height", "800")
          .attr("xlink:href", "image/1.png");
  
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
    .style("fill","grey");

var texts = svgContainer.selectAll("text")
                        .data(jsRects);
  
  texts.enter().append("text")
  .attr("x",function (d) { return 220 + d.px; })
    .attr("y",function (d) { return 30 + d.py; })
    .text(function(d) {return d.label;})
    .style("fill","grey");
  
  //tests = svgContainer.selectAll("rect");
  //tests[1].style("fill","yellow");
  //d3.select(rects[0][1]).style("fill","yellow");
var circles;

  


  
function render(data)
{
  
  circles = svgContainer.selectAll("circle")
              .data(data);
  var text;
         circles.enter().append("circle")
              .attr("cx", function (d) { return d.posx; })
                .attr("cy", function (d) { return d.posy; })
                .attr("r", function (d) { return 10 + d.nmax/1.5; })
                .style("fill", function(d) { return d.color; })
              .style("fill-opacity",0.4);
       
  circles.enter().append("circle")
              .attr("cx", function (d) { return d.posx; })
                .attr("cy", function (d) { return d.posy; })
                .attr("r", function (d) { return 10 + d.number/1.5; })
                .style("fill", function(d) { return d.color; })
              .on("mouseover", function(d){
             var s = d.area;
             text = svgContainer.append("text")
                                   .attr("x", d.posx)
                                     .attr("y", d.posy + 40 + d.number/1.5)
                                     .text(d.number + ',000,000')
                                     .style("fill",d.color)
             
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
                     d3.selectAll("polygon").remove();
                     text.remove();
           }
             
                });
  

                

    
}