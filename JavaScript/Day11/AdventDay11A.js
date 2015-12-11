(function() {
	var password = 'hxbxwxba';
	
	var a = 97, z = 122;
	
	function Increment(input, position) {
		// If we've hit the beginning of the string, we need to start incrementing from the right again.
		if(position > input.length) {
			return Increment(input, 1);
		}
		
		var last = input.charCodeAt(input.length - position) + 1;
		
		// If we've passed 'z', start back over at 'a' and carry the remainder to the next character.
		if(last > z) {
			last = a;
			input = input.substr(0, input.length - position) + String.fromCharCode(last) + input.substring(input.length - position + 1);
			input = Increment(input, position + 1)
		} else {
			input = input.substr(0, input.length - position) + String.fromCharCode(last) + input.substring(input.length - position + 1);
		}
		
		return input;
	}
	
	function Validate(input) {
		// Password must not contain i, o, or l.
		if(input.match(/i|o|l/) != null)
			return false;
		
		// Password must contain two unique pairs.
		if(input.match(/(\w)\1(?:.*)([^\1])\2/) == null)
			return false;
			
		// Password must contain a series of increasing letters 'bcd'		
		for(var i = 0; i < input.length - 3; i++) {
			var series = input.substr(i, 3);
			if(series.charCodeAt(1) == series.charCodeAt(0) + 1 && series.charCodeAt(1) == series.charCodeAt(2) - 1)
				return true;
		}
		
		return false;
	}
	
	// Increment at least once, then keep going until it is valid.
	password = Increment(password, 1);
	while(!Validate(password)) {
	 	password = Increment(password, 1);
	}
	
	return password
})();