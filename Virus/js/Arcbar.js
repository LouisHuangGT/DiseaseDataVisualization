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

    var ratiogender = new Array();
    ratiogender[0] = csvdata[0].male*100;
    var ratioage = new Array();
    ratioage[0] = csvdata[0].age0*100;
    ratioage[1] = csvdata[0].age1*100;
    ratioage[2] = csvdata[0].age2*100;
    ratioage.sort(function(a,b) {return a<b?1:-1});

    d3.select("#progress1")
    .attr("data-percentage",ratiogender)
    .attr("data-category1","male")
    .attr("data-category2","female")
    .attr("data-name","GENDER");

    d3.select("#progress2")
    .attr("data-percentage",ratioage)
    .attr("data-category1","<40")
    .attr("data-category2",">40")
    .attr("data-name","AGE");

    var wrapper1 = document.getElementById('progress1');
    var wrapper2 = document.getElementById('progress2');
    buildProgress(wrapper1,disease,ratiogender, 2,1);
    buildProgress(wrapper2,disease,ratioage, 3,3);
  });
}



function buildProgress(wrapper,disease,ratios, k,n)
{

  var paddingAngle = -Math.PI*17/31;
  var ratio = -paddingAngle*2/(2*Math.PI);
  var start = 0;

  var newratios = new Array();
  if (n == 1)
  {
    newratios[0] = ratios[0];
    newratios[1] = 100-newratios[0];
  }

  if (n == 3)
  {
    newratios[0] = ratios[2];
    newratios[1] = ratios[1]-ratios[2];
    newratios[2] = ratios[0]-ratios[1];
    newratios[3] = 100-(newratios[0]+newratios[1]+newratios[2]);
  }

  console.log(newratios);
  var end = ratios;
  var colours = {
    fill: '#' + wrapper.dataset.fillColour,
    track: '#' + wrapper.dataset.trackColour,
    text: '#' + wrapper.dataset.textColour,
    stroke: '#' + wrapper.dataset.strokeColour,
  }
  
  var radius = 105;
  var border = wrapper.dataset.trackWidth;
  var strokeSpacing = wrapper.dataset.strokeSpacing;
  var endAngle = Math.PI * 2;
  var formatText = d3.format('.0%');
  var boxSize = radius * 2;
  var count = end;
  var progress = start;
  var step = 0.01;
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
  var valuefill = new Array();
  if (disease == 4) //SARS
  {
  	if (name == "GENDER"){trackfill = "#898989";valuefill[0] = "#FFFFFF";}; 
  	if (name == "AGE"){trackfill = "#760000";valuefill[2] = "#ffabab";valuefill[1] = "#f16565";valuefill[0] = "#b43030";}
  }
  if (disease == 3) //H1N1
  {
  	if (name == "GENDER"){trackfill = "#898989";valuefill[0] = "#FFFFFF"}; 
  	if (name == "AGE"){trackfill = "#b37d0a";valuefill[2] = "#fff9db";valuefill[1] = "#ffe35e";valuefill[0] = "#deb805";}
  }
  if (disease == 1) //Zika
  {
  	if (name == "GENDER"){trackfill = "#898989";valuefill[0] = "#FFFFFF"}; 
  	if (name == "AGE"){trackfill = "#3e338c";valuefill[2] = "#dad5fe";valuefill[1] = "#a497ff";valuefill[0] = "#8175d0";}
  }
  if (disease == 2) //Ebloa
  {
  	if (name == "GENDER"){trackfill = "#898989";valuefill[0] = "#FFFFFF"}; 
  	if (name == "AGE"){trackfill = "#05665b";valuefill[2] = "#cbfff9";valuefill[1] = "#30ffe8";valuefill[0] = "#02baa5";}
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
        tooltip.html(function()
        {
          var t = newratios[n];
          return parseFloat(t.toFixed(2))+"%"
        })
        	.style("background",trackfill)
          .style("color","white")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 20) + "px")
            .style("opacity",0.7);
      })
    .on('mouseout',function(){
      tooltip.style("opacity",0.0)
    });
   
  
  //Add colour fill
  var value = new Array()
  for (var i = 0;i<n;i++)
  {
      var test = end[i];
      value[i] = track.append('path')
        .attr("id",i)
        .attr('class', 'radial-progress__value')
        .attr('fill', valuefill[i])
        .attr('stroke', valuefill[i])
        .attr('stroke-width', strokeSpacing + 'px')
        .on('mouseover',function(){
            tooltip.html((newratios[n-1-parseInt(this.id)].toFixed(2))+"%")
              .style("background",trackfill)
              .style("color","white")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",0.7);
          })
        .on('mouseout',function(){
          tooltip.style("opacity",0.0)
        });;
   }


  
  //Add text value
  if (n == 1)
  {
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
  .text("male")
  .attr("x",-10)
  .attr("y",-5)
  .attr("font-family", "Avenir")
  .attr("font-size","14px")
  .attr("fill",valuefill);
  g.append("text")
  .text("female")
  .attr("x",-10)
  .attr("y",15)
  .attr("font-family", "Avenir")
  .attr("font-size","14px")
  .attr("fill",trackfill);
 }
  if (n == 3)
  {
  var numberText = track.append('text')
    .attr('class', 'radial-progress__text')
    .attr('fill', colours.text)
    .attr('text-anchor', 'middle')
    .attr('dy', '-2rem');
  g.append("rect")
  .attr("x",-58)
  .attr("y",-17)
  .attr("width",14)
  .attr("height",14)
  .attr("fill",valuefill[2]);
   g.append("rect")
  .attr("x",-58)
  .attr("y",3)
  .attr("width",14)
  .attr("height",14)
  .attr("fill",valuefill[1]);
  g.append("rect")
  .attr("x",7)
  .attr("y",-17)
  .attr("width",14)
  .attr("height",14)
  .attr("fill",valuefill[0]);
  g.append("rect")
  .attr("x",7)
  .attr("y",3)
  .attr("width",14)
  .attr("height",14)
  .attr("fill",trackfill);

  g.append("text")
  .text("<18")
  .attr("x",-38)
  .attr("y",-5)
  .attr("font-family", "Avenir")
  .attr("font-size","14px")
  .attr("fill",valuefill[2]);
  g.append("text")
  .text("40-60")
  .attr("x",-38)
  .attr("y",15)
  .attr("font-family", "Avenir")
  .attr("font-size","14px")
  .attr("fill",valuefill[1]);
  g.append("text")
  .text("18-40")
  .attr("x",27)
  .attr("y",-5)
  .attr("font-family", "Avenir")
  .attr("font-size","14px")
  .attr("fill",valuefill[0]);
  g.append("text")
  .text(">60")
  .attr("x",27)
  .attr("y",15)
  .attr("font-family", "Avenir")
  .attr("font-size","14px")
  .attr("fill",trackfill);
 }

var progress = new Array();
for (var i = 0;i<n;i++)
{
  progress[i] = 0;
}
var lastStart = paddingAngle;
function update(progress,i) {
  //update position of endAngle

  value[i].attr('d', circle.endAngle((endAngle * progress[i]*ratio + paddingAngle)))


  lastStart = (endAngle * progress[i]*ratio + paddingAngle);
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
  for (var i = 0;i<n;i++)
  {
    update(progress,i);
    if (count[i] > 0) {
      //reduce count till it reaches 0
      count[i]--;
      //increase progress
      progress[i] += step;
      //Control the speed of the fill
    }

  }
      setTimeout(iterate, 10);
})();
}