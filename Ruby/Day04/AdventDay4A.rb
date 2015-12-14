require 'digest'

input = 'bgvyzdsv'; answer = 0

while(true)
	if Digest::MD5.hexdigest(input + answer.to_s)[0...5] == '00000'
		break
	end
	answer += 1
end

puts answer