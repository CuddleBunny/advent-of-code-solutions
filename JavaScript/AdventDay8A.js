(function() {
	var santasList = document.firstChild.textContent;
	
	// Remove white space:
	santasList = santasList.replace(/\s/g, '');
	
	var charactersInCode = santasList.length;
	console.log('Characters in code: ' + charactersInCode);
	
	// Escaped characters only count as one:
	santasList = santasList.replace(/(\\")|(\\\\)|(\\x\S{2})/g, '_');
	
	// Remove double quotes:
	santasList = santasList.replace(/"/g, '');
	
	var charactersInMemory = santasList.length;
	console.log('Characters in memory: ' + charactersInMemory);
	
	return charactersInCode - charactersInMemory;
})();