(function() {
	function Sum(data) {
		var sum = 0;
		
		if(Array.isArray(data)) {
			for(var i in data) {
				sum += Sum(data[i]);
			}
		} else if(typeof data == 'object') {			
			var keys = Object.keys(data);
		
			for(var i = 0; i < keys.length; i++) {
				sum += Sum(data[keys[i]]);
			}
		} else if(typeof data == 'number') {
			sum += data;
		}
		
		return sum;
	}
	
	return Sum(JSON.parse(document.firstChild.textContent));
})();
