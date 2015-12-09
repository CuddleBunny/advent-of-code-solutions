(function() {
	var map = {}, possibilities = [];
	
	//-- Helper Functions
	
	function BuildPath(location, path) {
		path.push(location);
		
		if(path.length == Object.keys(map).length) {
			possibilities.push(path);
		} else {
			Object.keys(map[location]).forEach(function(key) {
				// If we haven't already been there, add the next destination to the path. Deep copy the array so we don't have reference issues.
				if(path.indexOf(key) == -1)
					BuildPath(key, JSON.parse(JSON.stringify(path)));
			});
		}
	}
	
	function CalculateDistance(path) {
		var distance = map[path[0]][path[1]];
		
		for(var i = 1; i < path.length - 1; i++) {
			distance += map[path[i]][path[i + 1]];
		}
		
		return distance;
	}
	
	//-- Logic
	
	// Build a map using the distance data:
	document.firstChild.textContent.split('\n').forEach(function(data) {
		if(data.length == 0)
			return;
		
		// Break the data into [Place1, to, Place2, =, Distance]
		var parts = data.split(' ');
		
		// Ensure both places have an entry in our map
		if(!(parts[0] in map))
			map[parts[0]] = {};
			
		if(!(parts[2] in map))
			map[parts[2]] = {};
			
		// Add the distance to both entries because travel is not one-directional
		map[parts[0]][parts[2]] = parseInt(parts[4]);
		map[parts[2]][parts[0]] = parseInt(parts[4]);
	});
	
	// Build all possible paths:
	Object.keys(map).forEach(function(key) {
		BuildPath(key, []);
	});
	
	// Sort paths by distance:
	possibilities.sort(function(a, b) {
		return CalculateDistance(b) - CalculateDistance(a);
	});
	
	console.log('The longest path is: ' + possibilities[0]);
	console.log('The longest distance is: ' + CalculateDistance(possibilities[0]));
	
	return possibilities;
})();