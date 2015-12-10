input = '3113322113'

50.times do
	input = input.gsub(/(\d)\1*/) { | set |
		set.length.to_s + set[0]
	}
end

puts 'Output: ' + input
puts 'Length: ' + input.length.to_s