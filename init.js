let d = document;
let b = d.body;
let s = b.style;
let isIe = false;
let ie11Styles = [
	'msTextCombineHorizontal'
];
let ie10Styles = [
	'msTouchAction',
	'msWrapFlow',
	'msWrapMargin',
	'msWrapThrough',
	'msOverflowStyle',
	'msScrollChaining',
	'msScrollLimit',
	'msScrollLimitXMin',
	'msScrollLimitYMin',
	'msScrollLimitXMax',
	'msScrollLimitYMax',
	'msScrollRails',
	'msScrollSnapPointsX',
	'msScrollSnapPointsY',
	'msScrollSnapType',
	'msScrollSnapX',
	'msScrollSnapY',
	'msScrollTranslation',
	'msFlexbox',
	'msFlex',
	'msFlexOrder'];
let fwContainer = document.getElementById('fitbaseWidgetContainer');
let webComponent = document.querySelector('fitbase-widget');

check(ie11Styles);
check(ie10Styles);

function check(styles) {
	if (!isIe) {
		let prop;
		for (let i = 0; i < styles.length; i++) {
			prop = styles[i];

			if (s[prop] !== undefined) {
				isIe = true;
				break;
			}
		}
	}
}

if (isIe) {
	createAlert()
} else {
	loadApp();
}

function loadApp() {
	let src = webComponent.dataset.src;
	let script = d.createElement("script")
	script.type = "text/javascript";
	script.src = src;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function createAlert() {
	webComponent.parentNode.removeChild(webComponent);
	let ieAlert = d.createElement("div");
	ieAlert.className = "ieAlert";
	ieAlert.style.textAlign = "center";
	ieAlert.innerHTML = "Пожалуйста, установите более современный браузер";
	b.insertBefore(ieAlert, fwContainer);
}
