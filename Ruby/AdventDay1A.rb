input = File.read('../_Shared/Day1Input.txt'); floor = 0

input.chars.each do | c |
	if c == '('
		floor += 1
	elsif c == ')'
		floor -= 1
	end
end

floor