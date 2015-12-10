(function() {
	var coordinates = [[true]], x = 0, y = 0, unique = 1;
	
	document.body.firstChild.textContent.split('').forEach(function(instruction) {
		switch(instruction) {
			case '^':
				y--;
				break;
			case 'v':
				y++;
				break;
			case '>':
				x++;
				break;
			case '<':
				x--;
				break;
			default:
		}
		
		if(coordinates[x] == undefined)
			coordinates[x] = [];
		
		if(coordinates[x][y] == undefined) {
			coordinates[x][y] = true;
			unique++;
		}
	});
	
	return unique;
})();