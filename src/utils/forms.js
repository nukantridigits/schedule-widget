export const MASK_TYPE_PHONE = 'phone'
export const MASK_TYPE_PLACEHOLDER = 'placeholder'
export const DIGIT_FOR_REPLACE = '9';
export const OPEN_BRACKET_CHAR = '(';
export const CLOSE_BRACKET_CHAR = ')';
export const PLUS_CHAR = '+';

export const getPhoneMask = (type, phoneMask) => {
	let result = '';
	let replaceSymbol = type === MASK_TYPE_PHONE ? '1' : '_';
	let mask = phoneMask.replace(/\s+/g, '');
	let openBracketIndex = mask.indexOf(OPEN_BRACKET_CHAR);
	let closeBracketIndex = mask.indexOf(CLOSE_BRACKET_CHAR);

	result += mask.slice(0, openBracketIndex);
	result += ' ' + mask.slice(openBracketIndex, closeBracketIndex + 1) + ' ';
	mask = mask.slice(closeBracketIndex + 1, mask.length)
	mask = mask.replace(/-/g, ' ');
	result += mask

	let symbolsArray = result.split('');
	symbolsArray.forEach((symbol, index) => {
		if (symbol === DIGIT_FOR_REPLACE && index > openBracketIndex + 1) {
			symbolsArray[index] = replaceSymbol;
		}
	});

	result = symbolsArray.join('')
	if (type !== MASK_TYPE_PHONE) {
		return result;
	}

	result = result.replace(PLUS_CHAR, `\\${PLUS_CHAR}\\`);
	return result;
}
