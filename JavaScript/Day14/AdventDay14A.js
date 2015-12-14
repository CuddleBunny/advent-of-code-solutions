(function() {
	var reindeer = [], time = 2503;
	
	document.firstChild.textContent.split('\n').forEach(function(data) {
		if(data.length == 0)
			return;
			
		var parts = data.split(' ');
		
		reindeer.push({
			name: parts[0],
			speed: parseInt(parts[3]),
			endurance: parseInt(parts[6]),
			rest: parseInt(parts[13])
		});
	});
	
	
	reindeer.forEach(function(r) {
		r.distance = Math.floor(time / (r.endurance + r.rest)) * (r.speed * r.endurance)
		 	+ Math.min(r.endurance, time % (r.endurance + r.rest)) * r.speed;
		 
		console.log(r.name + ' traveled ' + r.distance);
	});
	
	reindeer.sort(function(a, b) {
		return b.distance - a.distance;
	});
	
	console.log('The fastest reindeer is: ' + reindeer[0].name + ' with a distance of ' + reindeer[0].distance + '.');
})();