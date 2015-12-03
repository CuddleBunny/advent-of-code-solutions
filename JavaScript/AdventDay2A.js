(function() {
	var l, w, h, surfaceArea, slack, sides, total = 0;

	document.body.firstChild.textContent.split('\n').forEach(function(present) {
		[l, w, h] = present.split('x').map(function(v) { return parseInt(v); });
		
		if(isNaN(l))
			return;
		
		sides = [l*w, w*h, h*l];
		slack = Math.min.apply(null, sides);
		surfaceArea = 2*l*w + 2*w*h + 2*h*l;
		total += surfaceArea + slack;
	});
	
	return total;
})()