require 'digest'

input = 'bgvyzdsv'; answer = 0

while(true)
	break if Digest::MD5.hexdigest(input + answer.to_s)[0...5] == '00000'
	answer += 1
end

puts answer