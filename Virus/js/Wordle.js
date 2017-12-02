var W_margin = {top: 100, right: 110, bottom: 30, left: 50},
  W_width = 250,
  W_height = 270 * 3;

var W_svg = d3.select("#Radar_svg");

var W_g = W_svg.append("g")
    .attr("width", W_width+W_margin.left+W_margin.right)
    .attr("height", W_height+W_margin.top+W_margin.bottom);

W_g.append("image")
    .attr("id", "wordle_img")
    .attr("href","image/wordle_ebola.jpg")
    .attr("width", 200)
    .attr('x', W_margin.left)
    .attr('y', W_height/7*5.45)
    .style('opacity',0);

function Wordle(k)
{
  var File_name = ["","zika","ebola","h1n1","sars"];
  d3.select("#wordle_img").transition().duration(1000)
    .attr("href","image/wordle_"+File_name[k]+".jpg")
    .style('opacity', 1.0);
}



// var fill = d3.scale.category20();

// var layout;

// function Wordle(k)
// {
// var File_name = ["","Zika","Ebola","H1N1","Sars"];

// d3.csv("data/"+File_name[k]+".csv", function(data) {
//   layout =  d3.layout.cloud()
//     .size([250, 250])
//     .words(data.map(function(d) {
//       return {text: d.word, size: (20 + +d.frequency) /2 };
//     }))
//     .padding(-1)
//     .rotate(function() { return ~~(Math.random() * 91) ; })
//     .font("Impact")
//     .fontSize(function(d) { return d.size; })
//     .on("end", draw);

//     layout.start();
// })
// }


function draw(words) {
  d3.select("body").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}
