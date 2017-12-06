var jsTexts = [
   { "px": 200, "py": 390,"v" :50000,"start" : 0},
   { "px": 600, "py": 390,"v" : 15000000,"start" : 0},
	{ "px": 1100, "py": 390,"v" : 13000000,"start" : 0}
];
	
 var firstSvg =  d3.select("body").append("svg")
                                     .attr("width", 1440)
                                     .attr("height", 800);

 firstSvg.append("image")
            .attr("x", "0")
            .attr("y", "-150")
            .attr("width", "1440")
            .attr("height", "800")
	        .attr("xlink:href", "image/home2.jpg");
	
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
    .style("fill","#e9554d")
	.style("font-family","Impact")
	.style("font-size","60");
	
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