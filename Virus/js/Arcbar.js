/**********************************************
/* Example of how to use d3 to create scalable 
/* SVG radial progress bars, controllable values 
/* and colours are passed in via data attributes.
************************************************/
// var disease = 3;
//   showRadialProgress(disease);
function showRadialProgress(disease)
{
  var ratios = [];
  var datasource = "data/Arcbar/table"+disease.toString()+".csv";

  d3.csv(datasource,function(error,csvdata){  
      if(error){  
          console.log(error);  
      }  

    ratios[0] = csvdata[0].male*100;
    ratios[1] = csvdata[0].young*100;
    console.log(ratios[0]);
    d3.select("#progress1")
    .attr("data-percentage",ratios[0])
    .attr("data-category1","male")
    .attr("data-category2","female")
    .attr("data-name","GENDER");

    d3.select("#progress2")
    .attr("data-percentage",ratios[1])
    .attr("data-category1","<40")
    .attr("data-category2",">40")
    .attr("data-name","AGE");

    var wrapper1 = document.getElementById('progress1');
    var wrapper2 = document.getElementById('progress2');
    buildProgress(wrapper1,disease, 2);
    buildProgress(wrapper2,disease, 3);
  });
}



function buildProgress(wrapper,disease, k)
{
  var paddingAngle = -Math.PI*17/31;
  var ratio = -paddingAngle*2/(2*Math.PI);
  var start = 0;
  var end = parseFloat(wrapper.dataset.percentage);
  
  var colours = {
    fill: '#' + wrapper.dataset.fillColour,
    track: '#' + wrapper.dataset.trackColour,
    text: '#' + wrapper.dataset.textColour,
    stroke: '#' + wrapper.dataset.strokeColour,
  }
  
  var radius = 90;
  var border = wrapper.dataset.trackWidth;
  var strokeSpacing = wrapper.dataset.strokeSpacing;
  var endAngle = Math.PI * 2;
  var formatText = d3.format('.0%');
  var boxSize = radius * 2;
  var count = end;
  var progress = start;
  var step = end < start ? -0.01 : 0.01;
  var category1 = wrapper.dataset.category1;
  var category2 = wrapper.dataset.category2;
  var name = wrapper.dataset.name;
  
  //Define the circle
  var circle = d3.svg.arc()
    .startAngle(paddingAngle)
    .innerRadius(radius)
    .outerRadius(radius - border);
  
  //setup SVG wrapper
  // var svg = d3.select(wrapper)
  //   .append('svg')
  //   .attr('width', boxSize)
  //   .attr('height', boxSize);
  var svg = d3.select('#Radar_svg');
  
  // ADD Group container
  var g = svg.append('g')
    .attr('transform', 'translate(' + 200 + ',' + (180 * k) + ')');
  
  var tooltip = d3.select("body")
  .append("div")
  .attr("class","tooltip")
  .style("opacity",0.0);

  var trackfill;
  var valuefill;
  if (disease == 4) 
  {
  	if (name == "GENDER"){trackfill = "#898989";valuefill = "#FFFFFF"}; 
  	if (name == "AGE"){trackfill = "#f16565";valuefill = "#760000"}
  }
  if (disease == 3) 
  {
  	if (name == "GENDER"){trackfill = "#898989";valuefill = "#FFFFFF"}; 
  	if (name == "AGE"){trackfill = "#ffe35e";valuefill = "#b37d0a"}
  }
  if (disease == 1) 
  {
  	if (name == "GENDER"){trackfill = "#898989";valuefill = "#FFFFFF"}; 
  	if (name == "AGE"){trackfill = "#a497ff";valuefill = "#3e338c"}
  }
  if (disease == 2) 
  {
  	if (name == "GENDER"){trackfill = "#898989";valuefill = "#FFFFFF"}; 
  	if (name == "AGE"){trackfill = "#30ffe8";valuefill = "#05665b"}
  }
  //Setup track
  var track = g.append('g').attr('class', 'radial-progress');
  track.append('path')
    .attr('class', 'radial-progress__background')
    .attr('fill', trackfill)
    .attr('stroke', trackfill)
    .attr('stroke-width', strokeSpacing + 'px')
    .attr('d', circle.endAngle(endAngle*ratio+paddingAngle))
    .on('mouseover',function(){
        tooltip.html(parseFloat((100-wrapper.dataset.percentage).toFixed(2))+"%")
        	.style("background",trackfill)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 20) + "px")
            .style("opacity",0.7);
      })
    .on('mouseout',function(){
      tooltip.style("opacity",0.0)
    });
   
  
  //Add colour fill
  var value = track.append('path')
    .attr('class', 'radial-progress__value')
    .attr('fill', valuefill)
    .attr('stroke', valuefill)
    .attr('stroke-width', strokeSpacing + 'px')      
    .on('mouseover',function(){
        tooltip.html(parseFloat(end.toFixed(2))+"%")
        	.style("background",valuefill)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 20) + "px")
            .style("opacity",0.7);
      })
    .on('mouseout',function(){
      tooltip.style("opacity",0.0)
    });

  
  //Add text value
  var numberText = track.append('text')
    .attr('class', 'radial-progress__text')
    .attr('fill', colours.text)
    .attr('text-anchor', 'middle')
    .attr('dy', '-2rem');
  g.append("rect")
  .attr("x",-30)
  .attr("y",-17)
  .attr("width",14)
  .attr("height",14)
  .attr("fill",valuefill);
   g.append("rect")
  .attr("x",-30)
  .attr("y",3)
  .attr("width",14)
  .attr("height",14)
  .attr("fill",trackfill);
  g.append("text")
  .text(category1)
  .attr("x",-10)
  .attr("y",-5)
  .attr("font-family", "Avenir")
  .attr("font-size","14px")
  .attr("fill",valuefill);
  g.append("text")
  .text(category2)
  .attr("x",-10)
  .attr("y",15)
  .attr("font-family", "Avenir")
  .attr("font-size","14px")
  .attr("fill",trackfill);


var lastStart = paddingAngle;
function update(progress) {
  //update position of endAngle

  value.attr('d', circle.endAngle((endAngle * progress*ratio + paddingAngle)))


  lastStart = (endAngle * progress*ratio + paddingAngle);
  //if (progress>0.3)
  //  value.attr('fill',"#BA8FD6");
  //update text value
  //numberText.text(formatText(progress));
  numberText
  .attr("font-family", "Avenir")
  .attr("font-size","20px")
  .text(name);
} 

(function iterate() {
  //call update to begin animation
  update(progress);
  if (count > 0) {
    //reduce count till it reaches 0
    count--;
    //increase progress
    progress += step;
    //Control the speed of the fill
    setTimeout(iterate, 10);
  }
})();
}