export default {
	install (Vue) {
		Vue.prototype.$getApiUrl = function () {
			return process.env.NODE_ENV === 'production' ? '' : 'http://fitbase.local';
		}
	}
}
