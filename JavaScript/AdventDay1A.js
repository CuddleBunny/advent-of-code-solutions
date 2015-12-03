(function() {
	var floor = 0, i,
		instructions = document.body.firstChild.textContent.split('');
		
	for(i = 0; i < instructions.length; i++) {
		if (instructions[i] == '(')
			floor++;
		else if (instructions[i] == ')')
			floor--;
	}
	
	return floor;
})();