$(document).ready(function(){

	// click effect
	$('.vico').on('click',function(e){
		var self = this;
		var x = e.pageX;
		var y = e.pageY;
		var clickX = x - $(self).offset().left;
		var clickY = y - $(self).offset().top;

		var setX = parseInt(clickX);
		var setY = parseInt(clickY);

		$(self).find('svg').remove();
		$(self).append('<svg><circle cx="'+setX+'" cy="'+setY+'" r="'+0+'"></circle></svg>');

		setTimeout(function(){
			var c = $(self).find("circle");
			c.animate({
				"r":Math.sqrt(Math.pow($(self).outerWidth(), 2) + Math.pow($(self).outerHeight(), 2)).toFixed(2)
			},{
				easing:"easeOutQuad",
				duration:400,
				step:function(val){
					c.attr("r",val);
				}
			})
		})
	})
}())