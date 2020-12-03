export const randomInteger = (min, max) => {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

export const makeId = () => {
	let text = '';
	let possible = 'a5bc7def2ghij90klmn3opq4rst1uvwx8yz';

	for (let i = 0; i < 16; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}