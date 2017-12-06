var LT_margin = {top: 100, right: 110, bottom: 30, left: 50},
	LT_width = 250,
	LT_height = 270 * 3;

var Month_index = ["","Jan","Feb","Mar","Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

var LT_svg = d3.select("#Radar_svg");

var LT_g = LT_svg.append("g")
		.attr("width", LT_width+LT_margin.left+LT_margin.right)
		.attr("height", LT_height+LT_margin.top+LT_margin.bottom);

//head
var LT_head1 = LT_g.append("text")
		.attr("class", "LT_head")
		.attr('x', LT_margin.left)
		.attr('y', LT_margin.top)
		.text('Epidemic Breakouts in 21st Century')
		.style("opacity", 0.9)
		.style("fill","white")
		.style("font-size", '30px')
		.style("font-family","Avenir");
var LT_head2 = LT_g.append("text")
		.attr("class", "LT_head")
		.attr('x', LT_margin.left)
		.attr('y', LT_margin.top*1.35)
		.text('Though technology and medical studies have been developing rapidly in')
		.style("opacity", 0.9)
		.style("fill","white")
		.style("font-size", '15px')
		.style("font-family","Avenir");
var LT_head3 = LT_g.append("text")
		.attr("class", "LT_head")
		.attr('x', LT_margin.left)
		.attr('y', LT_margin.top*1.60)
		.text('21st century, infectious diseases are still threatening people\'s life.')
		.style("opacity", 0.9)
		.style("fill","white")
		.style("font-size", '15px')
		.style("font-family","Avenir");

LT_g.append("image")
		.attr("href","image/legend.jpeg")
		.attr("id", "legend_img")
		.style("height",Radar_height/3)
		.style("width",336)
		.style("x",LT_margin.left)
		.style("y",LT_margin.top*0.7);
LT_g.append("image")
		.attr("href","image/L1_SARS.jpeg")
		.attr("id", "L1_img")
		.style("height",Radar_height*0.2)
		.style("x",LT_margin.left)
		.style("y",LT_margin.top*0.7)
		.style('opacity', 0.0);
LT_g.append("image")
		.attr("href","image/L2_SARS.jpeg")
		.attr("id", "L2_img")
		.style("height",Radar_height*0.32)
		.style("x",LT_margin.left+30)
		.style("y",LT_height*0.75)
		.style('opacity', 0.0);


//tooltip
var LT_tooltip = LT_g.append("rect")
	.attr("class", "LT_tooltip")
	.attr("width", 336)
	.attr("height", 327)
	.attr('x', LT_margin.left)
	.attr('y', LT_height/3)
	.style('fill', '#d8d8d8')
	.style('fill-opacity', 0.19);

var LT_tooltext = LT_g.append("text")
		.attr("class", "LT_tooltext")
		.attr('x', LT_margin.left+60)
		.attr('y', LT_height/3+160)
		.text('Select certain circel for detail')
		.style('font-family', 'Avenir')
		.style('text-aligh', 'justify')
		.style("opacity", 0.7)
		.style("fill","#ffffff");

var text_rect = LT_g.append('rect');


function drawTip(k, year, month){
	d3.csv("data/Key_event/"+Diease_name[k]+".csv", function(data) {
		d3.select(".LT_tooltip")
			.style('fill', Dot_color[k])
			.style('fill-opacity', 0.3)
			.style('stroke-width', '0.0px')
			.style('stroke', Dot_color[k]);
		d3.select(".LT_tooltext")
			.text(Diease_name[k]+"\n"+year+"\n"+Month_index[month])
			.style("opacity", 0.7)
			.style("fill","white")
			.attr('x', LT_margin.left+20)
			.attr('y', LT_height/3+35);

		LT_g.selectAll(".Key_text").remove();
		LT_g.selectAll(".Key_date").remove();
		LT_g.selectAll(".Key_circle").remove();

		var count = 0;
		LT_g.selectAll(".Key_circle")
			.data(data)
		.enter().append("circle")
		.attr("class", "Key_circle")
		.attr('cx', LT_margin.left+29)
		.attr('cy', function(d){ if (d.year == year && d.month == month) {count = count +1;return (count*70+LT_height/3+5); }})
		.attr('r', 5)
		.style("opacity", function(d){ if (d.year == year && d.month == month && count<=4) return 1.0; return 0;})
		.style("fill", Dot_color[k]);

		count = 0;
		LT_g.selectAll(".Key_date")
			.data(data)
		.enter().append("text")
		.attr("class", "Key_date")
		.attr('x', LT_margin.left+40)
		.attr('y', function(d){ if (d.year == year && d.month == month) {count = count +1;return (count*70+LT_height/3); }})
		.text(function(d){ if (d.year == year && d.month == month) return Month_index[d.month]+' '+d.day+', '+d.year; })
		.style("opacity", function(d){ if (d.year == year && d.month == month && count<=4) return 0.7; return 0;})
		.style("fill","white")
		.style("font-size", '13px');

		count = 0;
		LT_g.selectAll(".Key_text")
			.data(data)
		.enter().append("text")
		.attr("class", "Key_text")
		.attr('x', LT_margin.left+40)
		.attr('y', function(d){ if (d.year == year && d.month == month) {count = count +1;return (count*70+LT_height/3+20); }})
		// .text(function(d){ if (d.year == year && d.month == month) return d.event_detail.substring(0,45)+'...'; })
		.text(function(d){ if (d.year == year && d.month == month) return d.event_keyword + '  ('+ d.event_detail.substring(0,14)+'...'+')'; })
		.style("opacity", function(d){ if (d.year == year && d.month == month && count<=4) return 0.7; return 0;})
		.style("fill","white")
		.style("font-size", '13px')
		.on("mouseover", function(d) {
			if (d3.select(this).style('opacity')>0 && d.year == year && d.month == month)
			{
				var y = d3.select(this).attr('y')-15;
				
				text_rect.attr("width", d.event_detail.length*5.4+40)
					.attr("height", 20)
					.attr('x', LT_margin.left+37)
					.attr('y', y)
					.style('fill', Dot_color[k])
					.style('fill-opacity', 0.9)
					.style('stroke-width', '1.0px')
					.style('stroke', Dot_color[k])
					.style('opacity', 1.0);

				d3.select(this)
					.text(d.event_detail)
					.style("fill","black")
					.style("cursor", "pointer")
					.style('opacity', 1.0);
			}
		})
		.on("mouseout", function(d) {
			if (d3.select(this).style('opacity')>0 && d.year == year && d.month == month)
			{
				text_rect.style('opacity', 0.0);
				d3.select(this)
					.text(d.event_keyword + '  ('+ d.event_detail.substring(0,14)+'...'+')')
					.style("cursor", "pointer")
					.style("fill", "#ffffff")
					.style('opacity', 0.7);
			}
		})
		;



		});
}