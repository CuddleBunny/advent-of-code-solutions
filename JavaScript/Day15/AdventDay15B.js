(function() {
	var ingredients = [], bestRecipe = [0,0,0,0], highScore = 0, recipes = [], startTime = new Date().getTime();
	
	document.body.firstChild.textContent.split('\n').forEach(function(data) {
		if(data.length == 0)
			return;
		
		// Pull out all the numbers, some are negative.
		var stats = data.match(/-?\d+/g).map(function(i) { return parseInt(i); });
		
		ingredients.push({
			name: data.match(/\w+/)[0],
			capacity: stats[0],
			durability: stats[1],
			flavor: stats[2],
			texture: stats[3],
			calories: stats[4]
		});
	});
	
	function CalculateProperty(property, recipe) {
		var score = 0;
		for(var i = 0; i < recipe.length; i++) {
			score += ingredients[i][property] * recipe[i];
		}
		
		return Math.max(0, score);
	}
	
	function CalculateScore(recipe) {
		return CalculateProperty('capacity', recipe) * 
			CalculateProperty('durability', recipe) *
			CalculateProperty('flavor', recipe) *
			CalculateProperty('texture', recipe);
	}
	
	function BuildRecipes(recipe, i) {
		if(recipe[i] == 0)
			return;
		
		var score = CalculateScore(recipe);
		
		if(score > highScore && CalculateProperty('calories', recipe) == 500) {
			highScore = score;
			bestRecipe = recipe;
		}
		
		// For each ingredient, build another recipe by decrementing the current ingredient and adding it to one of the others.		
		for(var r = 0; r < recipe.length; r++) {
			if(r != i) {
				var newRecipe = [];
				
				for(var c = 0; c < recipe.length; c++) {
					if(c == i)
						newRecipe.push(recipe[c] - 1);
					else if(c == r)
						newRecipe.push(recipe[c] + 1);
					else
						newRecipe.push(recipe[c]);
				}
				
				// Only continue down this path if this recipe does not cause our score to become 0 when it wasn't already.
				if((score == 0 || CalculateScore(newRecipe) > score) && recipes.indexOf(newRecipe.toString()) == -1) {
					recipes.push(newRecipe.toString());
					BuildRecipes(newRecipe, i);
				}
			}
		}
	}
	
	// Determine which ingredient is the strongest to help us pick where to start:
	var strongestIngredient = [0,1,2,3].sort(function(a, b) {
		var spreadA = [24, 24, 24, 24], spreadB = [24, 24, 24, 24];
		
		spreadA[a] = 28;
		spreadB[b] = 28;
		
		return CalculateScore(spreadB) - CalculateScore(spreadA);
	})[0];
	
	console.log('The strongest ingredient is: ' + ingredients[strongestIngredient].name);
	
	bestRecipe[strongestIngredient] = 100;	
	BuildRecipes(bestRecipe, strongestIngredient);
	
	console.log('The best recipe is: ' + bestRecipe);
	console.log('With a total score of: ' + highScore);
	
	console.log('Total execution time = ' + (new Date().getTime() - startTime));
})();