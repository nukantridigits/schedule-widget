export default {
	install (Vue) {
		Vue.prototype.$getApiUrl = function () {
			return process.env.NODE_ENV === 'production' ? '^^domainName^^' : 'http://fitbase.local';
			// return process.env.NODE_ENV === 'production' ? 'https://nukantri.devops.fitbase.io' : 'http://fitbase.local';
			// return process.env.NODE_ENV === 'production' ? 'https://nukantri.devops.fitbase.io' : 'http://fitbase.local';
		}
	}
}
