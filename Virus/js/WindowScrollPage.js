window.onscroll = function()
   {
	var t = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(t);
	// console.log(flag);
	//	console.log("Calling this function ZHANG");
	
	if(t > 200 && t < 500)
	{
		StroyImg.transition()
		.duration(2000)
		.style("opacity",1);
		
	}
	
	if(t > 800 && t < 1000)
	{
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
	}
	
	if(t > 1600 && t < 1700)
	{
		StroyImg2.transition()
		.duration(2000)
		.style("opacity",1);
	}
	

	if(t >= 2100 && t < 2200 && !flag)
	{
		flag = true;
		var appearAnimeTime = 1000;
        AppearAnimation(appearAnimeTime);
		TipsBlinkAnimation(appearAnimeTime);
		CircleMoveInAnimation(appearAnimeTime);
	}
	else if(flag && ((t > 2800 && t < 2900) ||(t < 2100 && t > 1900) ))
	{
		flag = false;
		CircleMoveOutAnimation();
		TipsBlinkAnimationStop()
		DisappearAnimation()
	}
	
	if(t > 2900 && t < 3000)
	{
		StroyImg3.transition()
		.duration(2000)
		.style("opacity",1);
	}
		
}