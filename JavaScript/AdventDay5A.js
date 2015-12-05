(function() {
	var niceCount = 0;
	
	document.body.firstChild.textContent.split('\n').forEach(function(child) {
		// Must have at least three vowels
		if(child.match(/[aeiou]/g) == null || child.match(/[aeiou]/g).length < 3)
			return;
			
		// Must have at least one letter that occurs twice in a row
		if(child.match(/(\w)\1/) == null)
			return;
			
		// Must not contain the combinations 'ab', 'cd', 'pq', or 'zy'
		if(child.match(/(ab)|(cd)|(pq)|(xy)/) != null)
			return;
		
		niceCount++
	});
	
	return niceCount;
})();