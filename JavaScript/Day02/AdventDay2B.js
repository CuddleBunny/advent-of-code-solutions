(function() {
	var dimensions, bow, ribbon, total = 0;

	document.body.firstChild.textContent.split('\n').forEach(function(present) {
		dimensions = present.split('x').map(function(v) { return parseInt(v); }).sort(function(a, b) { return a-b; });
		
		if(dimensions.some(isNaN))
			return;
		
		bow = dimensions.reduce(function(a, b) { return a*b });
		
		ribbon = 2*dimensions[0] + 2*dimensions[1];
		
		total += bow + ribbon;
	});
	
	return total;
})()