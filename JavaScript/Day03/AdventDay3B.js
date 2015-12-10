(function() {
	var coordinates = [[true]], santa = { x: 0, y: 0 }, robo = { x: 0, y: 0 }, actor, unique = 1;
	var instructions = document.body.firstChild.textContent.split('');
	
	for(var i = 0; i < instructions.length; i++) {
		actor = i % 2 ? robo : santa;
		
		switch(instructions[i]) {
			case '^':
				actor.y--;
				break;
			case 'v':
				actor.y++;
				break;
			case '>':
				actor.x++;
				break;
			case '<':
				actor.x--;
				break;
			default:
		}
		
		if(coordinates[actor.x] == undefined)
			coordinates[actor.x] = [];
		
		if(coordinates[actor.x][actor.y] == undefined) {
			coordinates[actor.x][actor.y] = true;
			unique++;
		}
	}
	
	return unique;
})();