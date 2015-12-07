(function() {
	var lightGrid = [], litCount = 0, directive, range, start, end;
	
	for(var x = 0; x < 1000; x++) {
		lightGrid[x] = [];
		for(var y = 0; y < 1000; y++) {
			lightGrid[x][y] = false;
		}
	}
	
	document.body.firstChild.textContent.split('\n').forEach(function(instruction) {
		if(instruction.length == 0)
			return;
		
		directive = instruction.match(/[^\d]*/)[0].trim();
		range = instruction.match(/(\d+,\d+)/g);
		start = range[0].split(',').map(function(v) { return parseInt(v); });
		end = range[1].split(',').map(function(v) { return parseInt(v); });
		
		switch(directive) {
			case 'turn on':
				for (var x = start[0]; x <= end[0]; x++) {
					for (var y = start[1]; y <= end[1]; y++) {
						if (!lightGrid[x][y]) {
							litCount++;
							lightGrid[x][y] = true;
						}
					}
				}
				
				break;
			case 'turn off':
				for (var x = start[0]; x <= end[0]; x++) {
					for(var y = start[1]; y <= end[1]; y++) {
						if (lightGrid[x][y]) {
							litCount--;												
							lightGrid[x][y] = false;
						}
					}
				}
				
				break;
			case 'toggle':
				for (var x = start[0]; x <= end[0]; x++) {
					for(var y = start[1]; y <= end[1]; y++) {
						if(lightGrid[x][y])
							litCount--;
						else
							litCount++;
							
						lightGrid[x][y] = !lightGrid[x][y];
					}
				}
				
				break;
			default:
				console.log('Unknown directive: ' + directive);
		}
	});
	
	return litCount;
})();