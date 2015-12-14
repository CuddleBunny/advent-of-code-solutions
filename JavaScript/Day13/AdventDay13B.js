(function(){
	var attendees = {}, possibilities = [];
	
	function BuildTable(person, table) {
		table.push(person);
		
		if(table.length == Object.keys(attendees).length)
			possibilities.push(table);
		else {
			Object.keys(attendees[person]).forEach(function(key) {
				// If this person is not already sitting, add them to the table. Deep copy the array to avoid reference issues.
				if(table.indexOf(key) == -1)
					BuildTable(key, JSON.parse(JSON.stringify(table)));
			});
		}
	}
	
	function CalculateHappiness(table) {
		// Initialize happiness to the affinity of the first two people.
		var happiness = attendees[table[0]][table[1]];
		
		// Loop through the remaining people and add the affinity for both neighbors.
		for(var i = 1; i < table.length - 1; i++) {
			happiness += attendees[table[i]][table[i - 1]];
			happiness += attendees[table[i]][table[i + 1]];
		}
		
		// The above loop excludes the last person's first neighbor.
		happiness += attendees[table[table.length - 1]][table[table.length -2]];
		
		// Don't forget that the first and last person in the array end up sitting next to each other.
		happiness += attendees[table[0]][table[table.length - 1]];
		happiness += attendees[table[table.length - 1]][table[0]];
		
		return happiness;
	}
	
	document.firstChild.textContent.split('\n').forEach(function(data) {
		if(data.length == 0)
			return;
			
		var parts = data.replace('.', '').split(' ');
		
		// If we haven't yet encountered this attendee, add them to the table and note their indifference to me.
		if(!(parts[0] in attendees))
			attendees[parts[0]] = { me: 0 };
			
		attendees[parts[0]][parts[10]] = parts[2] == 'gain' ? parseInt(parts[3]) : - parseInt(parts[3]);
	});
	
	// Add me:
	attendees.me = {};
	Object.keys(attendees).forEach(function(key) {
		if(key != 'me')
			attendees.me[key] = 0;
	});
	
	console.log(attendees);
	
	// Construct all possible table layouts:
	Object.keys(attendees).forEach(function(key) {
		BuildTable(key, []);
	});
	
	// Sort tables by increasing happiness:
	possibilities.sort(function(a, b) {
		return CalculateHappiness(b) - CalculateHappiness(a);
	});
	
	console.log('The best seating order is: ' + JSON.stringify(possibilities[0]));
	console.log('The highest happiness value is: ' + CalculateHappiness(possibilities[0]));
})();