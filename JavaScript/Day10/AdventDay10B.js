(function() {
	var input = '3113322113', parts;
	
	for(var i = 0; i < 50; i++) {
		var temp = '';
		parts = input.match(/(\d)\1*/g);
		parts.forEach(function(s) {
			temp += s.length + s[0];
		});
		input = temp;
	} 
	
	console.log('Output: ' + input);
	console.log('Length: ' + input.length);
})();