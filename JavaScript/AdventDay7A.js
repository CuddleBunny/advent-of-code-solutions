(function() {
	var circuit = {};
		
	// First, let's build the circuit:
	document.body.firstChild.textContent.split('\n').forEach(function(instruction) {
		if(instruction.length == 0)
			return;
		
		var parts = instruction.split('->').map(function(v) { return v.trim(); });
		
		// Add the target wire to the circuit and note its inputs.
		circuit[parts[1]] = {
			operands: parts[0].match(/[^A-Z\s]+/g), 
			operation: parts[0].match(/[A-Z]+/) ? parts[0].match(/[A-Z]+/)[0] : 'ASSIGN', 
			signal: null 
		};
	});
	
	// Now that we have our circuit, loop through and calculate the signal using 
outerLoop:
	while(Object.keys(circuit).length > 0) {
		for(var w in circuit) {
			if(circuit[w].signal != null)
				continue;
			
			switch(circuit[w].operation) {
				case 'ASSIGN':
					// Assign the signal of the operand to the wire:					
					circuit[w].signal = isNaN(parseInt(circuit[w].operands[0])) ? circuit[circuit[w].operands[0]].signal : parseInt(circuit[w].operands[0]);										
					break;
				case 'NOT':
					var operand = isNaN(parseInt(circuit[w].operands[0])) ? circuit[circuit[w].operands[0]].signal : parseInt(circuit[w].operands[0]);
					
					if(operand != null)
						circuit[w].signal = ~ operand;
					break;
				case 'AND':
					// Assign the result of a bitwise AND on the signals of both inputs to the wire:
					var leftOperand = isNaN(parseInt(circuit[w].operands[0])) ? circuit[circuit[w].operands[0]].signal : parseInt(circuit[w].operands[0]);
					var rightOperand = isNaN(parseInt(circuit[w].operands[1])) ? circuit[circuit[w].operands[1]].signal : parseInt(circuit[w].operands[1]);
					
					if(leftOperand != null && rightOperand != null)
						circuit[w].signal = leftOperand & rightOperand;
					break;
				case 'OR':
					// Assign the result of a bitwise OR on the signals of both inputs to the wire:
					var leftOperand = isNaN(parseInt(circuit[w].operands[0])) ? circuit[circuit[w].operands[0]].signal : parseInt(circuit[w].operands[0]);
					var rightOperand = isNaN(parseInt(circuit[w].operands[1])) ? circuit[circuit[w].operands[1]].signal : parseInt(circuit[w].operands[1]);
					
					if(leftOperand != null && rightOperand != null)
						circuit[w].signal = leftOperand | rightOperand;
					break;
				case 'LSHIFT':
					// Left shift the signal of the operand and ensure the result is 16-bit.
					if(circuit[circuit[w].operands[0]].signal != null)
						circuit[w].signal = (circuit[circuit[w].operands[0]].signal << circuit[w].operands[1]) % 0b10000000000000000;
					break;
				case 'RSHIFT':
					// Right shift the signal of the operand.
					if(circuit[circuit[w].operands[0]].signal != null)
						circuit[w].signal = circuit[circuit[w].operands[0]].signal >>> circuit[w].operands[1];
					break;
			}
			
			// If this wire is a, stop because we found the answer:
			if(circuit[w].signal != null && w == 'a') {
				break outerLoop;
			}
		}
	}
	
	return circuit['a'].signal;
})();