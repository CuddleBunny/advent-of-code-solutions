(function() {
	var niceCount = 0;
	
	document.body.firstChild.textContent.split('\n').forEach(function(child) {			
		// Must have at least two occurances of any pair of characters that don't overlap
		if(child.match(/(\w\w).*\1/g) == null)
			return;
			
		// Must have at least one letter that repeats separated by only one other letter
		if(child.match(/(\w)\w\1/g) == null)
			return;
		
		niceCount++
	});
	
	return niceCount;
})();