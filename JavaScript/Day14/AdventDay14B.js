(function() {
	var reindeer = [], time = 2503, leaders;
	
	document.firstChild.textContent.split('\n').forEach(function(data) {
		if(data.length == 0)
			return;
			
		var parts = data.split(' ');
		
		reindeer.push({
			name: parts[0],
			speed: parseInt(parts[3]),
			endurance: parseInt(parts[6]),
			rest: parseInt(parts[13]),
			score: 0
		});
	});
	
	for(var t = 1; t <= time; t++) {
		leaders = [];
	
		reindeer.forEach(function(r) {
			r.distance = Math.floor(t / (r.endurance + r.rest)) * (r.speed * r.endurance)
				+ Math.min(r.endurance, t % (r.endurance + r.rest)) * r.speed;
				
			if(leaders.length == 0 || r.distance > leaders[0].distance)
				leaders = [r];
			else if(r.distance == leaders[0].distance)
				leaders.push(r);
		});
		
		for(var l in leaders) {
			leaders[l].score++;
		}
	}
	
	reindeer.sort(function(a, b) {
		return b.score - a.score;
	});
	
	console.log('The highest ranking reindeer is: ' + reindeer[0].name + ' with a score of ' + reindeer[0].score + '.');
	return reindeer;
})();