(function() {
	var santasList = document.firstChild.textContent;	
	var encodedList = '';
		
	// Remove white space but don't save it because we need to split by newline:
	var charactersInCode = santasList.replace(/\s/g, '').length;
	console.log('Characters in code: ' + charactersInCode);

	santasList.split('\n').forEach(function(item) {
		// Ignore the empty item on the last line.
		if(item.length == 0)
			return;
		
		// Encode the string and wrap it in new double quotes.
		item = '"' + item.replace(/("|\\)/g, '\\$1') + '"';
		
		// Remove any remaining white space just in case.
		item = item.replace(/\s/g, '');
				
		encodedList += item;
	});
	
	var charactersAfterEncoding = encodedList.length;
	console.log('Characters after encoding: ' + charactersAfterEncoding);
		
	return charactersAfterEncoding - charactersInCode;
})();