input = File.read('../_Shared/Day1Input.txt'); floor = 0; index = 0

input.chars.each_with_index do | c, i |
	if c == '('
		floor += 1
	elsif c == ')'
		floor -= 1
	end
	
	if floor == -1
		index = i + 1
		break
	end
end

index