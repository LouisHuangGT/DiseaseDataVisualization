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
      }  var male = 0;
      var female = 0;  
      var young = 0;
      var old = 0;
      for( var i=0; i<csvdata.length; i++ ){  
          if (csvdata[i].gender == "Male")
            male = male+1;
          else
            female = female+1;
          if (parseInt(csvdata[i].age)<40)
            young = young + 1;
          else
            old = old + 1;
      }   
    ratios[0] = male*1.0/(male+female)*100;
    ratios[1] = young*1.0/(young+old)*100;
    console.log(ratios[0]);

    d3.select("#progress1")
    .attr("data-percentage",ratios[0])
    .attr("data-category1","male")
    .attr("data-category2","female")
    .attr("data-name","gender");

    d3.select("#progress2")
    .attr("data-percentage",ratios[1])
    .attr("data-category1","young")
    .attr("data-category2","old")
    .attr("data-name","age");

    var wrapper1 = document.getElementById('progress1');
    var wrapper2 = document.getElementById('progress2');
    buildProgress(wrapper1, 2);
    buildProgress(wrapper2, 4);
  });
}



function buildProgress(wrapper, k)
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
  
  var radius = 100;
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
    .attr('transform', 'translate(' + boxSize*0.75 + ',' + (boxSize / 2 * k) + ')');
  
  var tooltip = d3.select("body")
  .append("div")
  .attr("class","tooltip")
  .style("opacity",0.0);

  //Setup track
  var track = g.append('g').attr('class', 'radial-progress');
  track.append('path')
    .attr('class', 'radial-progress__background')
    .attr('fill', colours.track)
    .attr('stroke', colours.stroke)
    .attr('stroke-width', strokeSpacing + 'px')
    .attr('d', circle.endAngle(endAngle*ratio+paddingAngle))
    .on('mouseover',function(){
        tooltip.html(category2)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 20) + "px")
            .style("opacity",1.0);
      })
    .on('mouseout',function(){
      tooltip.style("opacity",0.0)
    });
   
  
  //Add colour fill
  var value = track.append('path')
    .attr('class', 'radial-progress__value')
    .attr('fill', colours.fill)
    .attr('stroke', colours.stroke)
    .attr('stroke-width', strokeSpacing + 'px')      
    .on('mouseover',function(){
        tooltip.html(category1)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 20) + "px")
            .style("opacity",1.0);
      })
    .on('mouseout',function(){
      tooltip.style("opacity",0.0)
    });

  
  //Add text value
  var numberText = track.append('text')
    .attr('class', 'radial-progress__text')
    .attr('fill', colours.text)
    .attr('text-anchor', 'middle')
    .attr('dy', '.5rem');

var lastStart = paddingAngle;
function update(progress) {
  //update position of endAngle

  value.attr('d', circle.endAngle((endAngle * progress*ratio + paddingAngle)))


  lastStart = (endAngle * progress*ratio + paddingAngle);
  //if (progress>0.3)
  //  value.attr('fill',"#BA8FD6");
  //update text value
  //numberText.text(formatText(progress));
  numberText.text(name);
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