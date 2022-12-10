export const clamp = (number, min, max) => {
	if (number < min) return min
	if (number > max) return max
	return number
}

export const wrap = (number, min, max) => {
	const range = max - min + 1
	while (number < min) number += range
	while (number > max) number -= range
	return number
}

export const getDigits = (number) => {
	const chars = number.toString().split("")
	const digits = chars.map(v => parseInt(v)).filter(v => !isNaN(v))
	return digits
}

export const gcd = (...numbers) => {
	const [head, ...tail] = numbers
	if (numbers.length === 1) return head
	if (numbers.length > 2) return gcd(head, gcd(...tail))
	
	let [a, b] = [head, ...tail]
	while (true) {
		if (b === 0) return a
		a = a % b
		if (a === 0) return b
		b = b % a
	}
}

export const simplifyRatio = (...numbers) => {
	const divisor = gcd(...numbers)
	return numbers.map(n => n / divisor)
}

export const range = function* (start, end) {
	let i = start
	if (i <= end) do {
		yield i
		i++
	} while (i <= end) else while (i >= end) {
		yield i
		i--
	}
}